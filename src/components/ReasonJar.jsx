import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reasonsData from "../data/reasons.json";

const ReasonJar = () => {
  const [activeNotes, setActiveNotes] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const containerRef = useRef(null);

  const colors = [
    "bg-rose-100 border-rose-300 text-rose-600",
    "bg-pink-100 border-pink-300 text-pink-600",
    "bg-amber-100 border-amber-300 text-amber-600",
    "bg-red-50 border-red-200 text-red-500",
    "bg-white border-primary/20 text-primary"
  ];

  const spawnNote = () => {
    setIsOpening(true);
    const randomIndex = Math.floor(Math.random() * reasonsData.length);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newNote = {
      id: Date.now(),
      text: reasonsData[randomIndex],
      color: randomColor,
      // Target float coordinates
      targetX: Math.random() * 400 - 200,
      targetY: Math.random() * -300 - 150,
      rotate: Math.random() * 90 - 45
    };

    setActiveNotes(prev => [...prev.slice(-11), newNote]); 
    setTimeout(() => setIsOpening(false), 400);
  };

  const removeNote = (id) => {
    setActiveNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center mb-12 min-h-[700px] relative justify-end pb-12" ref={containerRef}>
      
      <div className="relative group cursor-pointer z-30" onClick={spawnNote}>
        <motion.div
           animate={isOpening ? { 
             scale: [1, 1.05, 1],
             rotate: [0, -3, 3, -3, 3, 0],
             y: [0, -10, 0]
           } : {}}
           whileHover={{ scale: 1.02 }}
           className="relative"
        >
          <motion.div 
            animate={isOpening ? { y: -30, rotate: -15, opacity: 0.8 } : { y: 0, rotate: 0, opacity: 1 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-primary rounded-full z-10 shadow-lg border-b-4 border-black/10"
          />

          <div className="w-56 h-72 bg-gradient-to-b from-white/20 to-white/5 border-[3px] border-white/30 rounded-t-[50px] rounded-b-[30px] relative overflow-hidden backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="absolute top-0 right-8 w-4 h-full bg-white/10 skew-x-[-15deg]" />
            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-primary/30 to-transparent animate-pulse" />
            <div className="absolute inset-0 flex flex-wrap justify-center items-center content-center gap-3 p-6 select-none shadow-inner">
               <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-3xl">❤️</motion.span>
               <span className="text-xl opacity-40">✨</span>
               <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-2xl">💖</motion.span>
               <span className="text-lg opacity-30">🎀</span>
               <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="text-2xl">💕</motion.span>
            </div>
          </div>

          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[85%] bg-white/90 backdrop-blur-sm border-[1px] border-primary/20 p-3 rounded-md shadow-2xl rotate-[-2deg] flex flex-col items-center">
            <div className="w-full border-[1px] border-dashed border-primary/30 p-2 flex flex-col items-center">
                <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">Private Collection</span>
                <span className="text-primary/80 font-serif italic text-xl mt-1">Reasons I Love You</span>
                <div className="mt-2 text-[8px] text-gray-400 font-mono tracking-widest">EST. 2026 • VALENTINE</div>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence>
            {activeNotes.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full whitespace-nowrap animate-bounce shadow-2xl z-40 border border-white/20"
                >
                    Open the jar of hearts ✦
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {activeNotes.map((note) => (
            <motion.div
              key={note.id}
              className="absolute left-1/2 top-1/2 pointer-events-auto cursor-grab active:cursor-grabbing"
              initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                x: [0, note.targetX, note.targetX + (Math.random() * 20 - 10)],
                y: [0, note.targetY, note.targetY - 100],
                rotate: [0, note.rotate, note.rotate + 10],
                scale: 1,
                opacity: 1
              }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ 
                x: { duration: 1.5, ease: "easeOut" },
                y: { duration: 2, ease: "backOut" },
                scale: { duration: 0.5 },
                rotate: { duration: 1.5 },
                opacity: { duration: 0.3 }
              }}
              drag
              dragConstraints={containerRef}
              dragElastic={0.6}
              whileHover={{ scale: 1.05, zIndex: 100 }}
              whileDrag={{ scale: 1.1, zIndex: 100 }}
            >
               <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                 className={`group relative p-6 w-56 shadow-[0_15px_35px_rgba(0,0,0,0.1)] rounded-sm border-l-[6px] transition-transform ${note.color} bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md border-2 border-white/50" />
                  <p className="text-sm font-bold leading-relaxed font-['Outfit'] select-none">
                    {note.text}
                  </p>
                  <div className="mt-4 flex justify-between items-center opacity-30 text-[8px] font-black uppercase tracking-widest border-t pt-2">
                    <span>From Me</span>
                    <span>No. {Math.floor(Math.random() * 1000)}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNote(note.id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    ✕
                  </button>
               </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-16 text-center z-10 px-6">
        <h4 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-2">Infinite Reasons</h4>
        <p className="text-primary/30 italic text-sm max-w-sm">
          “Every note is a whispered promise of my love for you.”
        </p>
      </div>
    </div>
  );
};

export default ReasonJar;
