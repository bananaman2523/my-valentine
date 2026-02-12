import { motion } from "framer-motion";

const ScrollingWavyText = ({ text, direction = "left" }) => {
  const content = `${text} 💖 `;
  const repeatCount = 10;
  const fullText = Array(repeatCount).fill(content).join("");
  const letters = Array.from(fullText);

  return (
    <div className="overflow-hidden whitespace-nowrap py-4 bg-primary/10 w-full relative">
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        style={{ display: "flex" }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-4xl md:text-5xl font-bold text-primary mx-[1px]"
            style={{ display: "inline-block" }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (index % content.length) * 0.1,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingWavyText;
