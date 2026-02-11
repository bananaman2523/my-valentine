import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Password Screen Component
const PasswordScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default password is "hongtae" (case insensitive)
    if (password.toLowerCase() === "hongtae") {
      onLogin();
    } else {
      setError(true);
      // Shake animation trigger
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white p-4"
    >
      <div className="w-full max-w-xs text-center">
        <h2 className="text-3xl font-bold mb-8 tracking-widest">
          WHO IS YOUR VALENTINE?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-transparent border-b-2 border-white/30 p-3 text-center text-xl outline-none placeholder:text-white/20 focus:border-white transition-colors"
              autoFocus
            />
          </motion.div>
          
          <button 
            type="submit"
            className="px-8 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
          >
            Enter
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// Component for the scrolling wavy text
const ScrollingWavyText = ({ text, direction = "left" }) => {
  // Use a longer repeated string to ensure smooth customized looping coverage
  // Adding spaces/icons for separation
  const content = `${text} 💖 `;
  const repeatCount = 10; // Repeat enough to cover wide screens
  const fullText = Array(repeatCount).fill(content).join("");
  
  const letters = Array.from(fullText);

  // Animation variants for the container (scrolling)
  const marqueeVariants = {
    animate: {
      x: direction === "left" ? [0, -1000] : [-1000, 0], // Move based on direction
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // Adjust speed
          ease: "linear",
        },
      },
    },
  };

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
          duration: 30, // Adjust speed here
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
              delay: (index % content.length) * 0.1, // Stagger based on original text length pattern
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

// Bento Grid Component
const BentoGrid = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 w-full max-w-4xl mb-8 h-[500px] md:h-[600px]">
      {/* Large item */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative group"
      >
        <img src="https://placehold.co/600x600?text=Us+💖" alt="Main Memory" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </motion.div>
      
      {/* Vertical item */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative group"
      >
        <img src="https://placehold.co/300x600?text=Together" alt="Memory 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </motion.div>
      
      {/* Small item 1 */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative group"
      >
        <img src="https://placehold.co/300x300?text=Cute" alt="Memory 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </motion.div>

      {/* Small item 2 */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative group"
      >
        <img src="https://placehold.co/300x300?text=Love" alt="Memory 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </motion.div>

      {/* Horizontal item */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative group"
      >
        <img src="https://placehold.co/600x300?text=Memories" alt="Memory 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </motion.div>

      {/* Small item 3 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative group"
      >
        <img src="https://placehold.co/300x300?text=Happy" alt="Memory 6" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </motion.div>

      {/* Small item 4 */}
      <motion.div 
        initial={{ opacity: 0, rotate: -5 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.7 }}
        className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative group"
      >
        <img src="https://placehold.co/300x300?text=Forever" alt="Memory 7" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </motion.div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const celebrate = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4']
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isAuthenticated && (
          <PasswordScreen onLogin={() => setIsAuthenticated(true)} />
        )}
      </AnimatePresence>
      
      {isAuthenticated && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen w-full bg-base-200 flex flex-col relative font-['Outfit'] overflow-x-hidden"
        >
          {/* Decorative background elements */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 z-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Header Marquee */}
          <div className="w-full z-10 shadow-sm border-b border-primary/10 bg-base-100/50 backdrop-blur-sm flex-none">
            <ScrollingWavyText text="I LOVE YOU YAYEE" direction="right" />
          </div>

          {/* Main Content */}
          <div className="flex-grow flex flex-col items-center justify-center p-4 z-10 py-8">
            {/* Bento Grid Gallery */}
            <BentoGrid />

            {/* Action Card */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.5 }}
              className="card w-full max-w-sm md:max-w-md bg-base-100/80 backdrop-blur-md shadow-2xl border-4 border-base-100"
            >
              <div className="card-body items-center text-center p-6">
                <h2 className="card-title text-primary text-2xl font-bold mb-2">Happy Valentine's Day! 💖</h2>
                <p className="text-lg text-base-content/80 mb-6">ขอบคุณที่เป็นความสุขให้กันนะ รักที่สุดเลย!</p>
                <div className="card-actions w-full">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-block text-lg shadow-lg shadow-primary/30" 
                    onClick={celebrate}
                  >
                    กดรับความรัก 💌
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Marquee */}
          <div className="w-full z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-primary/10 bg-base-100/50 backdrop-blur-sm flex-none">
            <ScrollingWavyText text="I LOVE YOU YAYEE" direction="right" />
          </div>
        </motion.div>
      )}
    </>
  );
}

export default App;