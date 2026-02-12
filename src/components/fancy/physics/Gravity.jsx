import React, { createContext, useContext, useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import Matter from "matter-js";

const GravityContext = createContext(null);

export const MatterBody = ({ children, matterBodyOptions = {}, bodyType = "rectangle", x, y, width, height, radius }) => {
  const { engine, bodiesMap } = useContext(GravityContext);
  const ref = useRef(null);
  const id = useRef(Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    if (!engine || !ref.current) return;

    const { world } = engine;
    const element = ref.current;
    
    // Parse coordinates properly
    const parseCoord = (val, max) => {
      if (typeof val === "string" && val.endsWith("%")) {
        return (parseFloat(val) / 100) * max;
      }
      return parseFloat(val) || 0;
    };

    const container = element.closest('.gravity-container');
    const containerWidth = container?.clientWidth || window.innerWidth;
    const containerHeight = container?.clientHeight || window.innerHeight;

    const startX = parseCoord(x, containerWidth);
    const startY = parseCoord(y, containerHeight);

    // Get actual size with a fallback for hidden elements
    const rect = element.getBoundingClientRect();
    const bodyWidth = width || (rect.width > 0 ? rect.width : 120);
    const bodyHeight = height || (rect.height > 0 ? rect.height : 40);

    let body;
    if (bodyType === "circle") {
      body = Matter.Bodies.circle(startX, startY, radius || Math.max(bodyWidth, bodyHeight) / 2, {
        ...matterBodyOptions,
        label: id.current
      });
    } else {
      body = Matter.Bodies.rectangle(startX, startY, bodyWidth, bodyHeight, {
        ...matterBodyOptions,
        label: id.current
      });
    }

    Matter.Composite.add(world, body);
    bodiesMap.current.set(id.current, { body, element });

    // Force visibility update
    element.style.visibility = 'visible';

    return () => {
      Matter.Composite.remove(world, body);
      bodiesMap.current.delete(id.current);
    };
  }, [engine, x, y, bodyType]); // Add dependencies to allow dynamic updates if needed

  return (
    <div ref={ref} className="absolute touch-none select-none" style={{ left: 0, top: 0, visibility: 'hidden' }}>
      {children}
    </div>
  );
};

const Gravity = forwardRef(({ children, gravity = { x: 0, y: 1 }, className = "", resetKey }, ref) => {
  const containerRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const bodiesMap = useRef(new Map());
  const [engine, setEngine] = useState(null);

  useImperativeHandle(ref, () => ({
    getEngine: () => engineRef.current
  }));

  useEffect(() => {
    const engine = engineRef.current;
    engine.gravity.x = gravity.x;
    engine.gravity.y = gravity.y;

    const container = containerRef.current;
    
    // Function to set up walls based on current container size
    const setupWorld = () => {
      const { width, height } = container.getBoundingClientRect();
      const world = engine.world;
      
      // Clear existing walls (if any)
      Matter.World.clear(world, false);

      const wallOptions = { isStatic: true, friction: 0.5, label: 'wall' };
      const ground = Matter.Bodies.rectangle(width / 2, height + 25, width + 100, 50, wallOptions);
      const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height + 100, wallOptions);
      const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height + 100, wallOptions);
      const ceiling = Matter.Bodies.rectangle(width / 2, -25, width + 100, 50, wallOptions);

      Matter.Composite.add(world, [ground, leftWall, rightWall, ceiling]);
    };

    setupWorld();

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    setEngine(engine);

    let animationId;
    const update = () => {
      bodiesMap.current.forEach(({ body, element }) => {
        if (element) {
          element.style.visibility = 'visible';
          element.style.transform = `translate(${body.position.x - element.offsetWidth / 2}px, ${body.position.y - element.offsetHeight / 2}px) rotate(${body.angle}rad)`;
        }
      });
      animationId = requestAnimationFrame(update);
    };
    update();

    // Handle resize
    const handleResize = () => setupWorld();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world);
    };
  }, [resetKey]);

  return (
    <GravityContext.Provider value={{ engine, bodiesMap }}>
      <div ref={containerRef} className={`relative overflow-hidden gravity-container ${className}`}>
        {children}
      </div>
    </GravityContext.Provider>
  );
});

export default Gravity;
