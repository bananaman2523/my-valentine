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
// Letter Envelope Component
const LetterEnvelope = ({ isOpen, onOpen }) => {
  const toggleEnvelope = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <motion.div 
        className="relative w-64 h-44 bg-pink-200 rounded-b-lg shadow-xl cursor-pointer preserve-3d"
        onClick={toggleEnvelope}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Back of Envelope */}
        <div className="absolute inset-0 bg-pink-300 rounded-b-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full border-t-[88px] border-t-transparent border-l-[128px] border-l-pink-400 border-r-[128px] border-r-pink-400 border-b-[88px] border-b-pink-500"></div>
        </div>

        {/* Paper / Letter Inside */}
        <motion.div 
          className="absolute top-2 left-4 right-4 h-32 bg-white shadow-sm p-4 flex flex-col items-center justify-center rounded-sm z-10"
          animate={isOpen ? { y: -60, transition: { delay: 0.5, duration: 0.8 } } : { y: 0 }}
        >
          <div className="w-12 h-1 bg-pink-100 mb-2"></div>
          <div className="w-full h-1 bg-pink-50 mb-1"></div>
          <div className="w-full h-1 bg-pink-50 mb-1"></div>
          <div className="w-3/4 h-1 bg-pink-50"></div>
          <div className="mt-2 text-pink-400 font-bold text-xs uppercase tracking-tighter">Open Me</div>
        </motion.div>

        {/* Top Flap */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-0 border-t-[90px] border-t-pink-200 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent z-20 origin-top"
          animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {!isOpen && (
          <div className="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center animate-bounce z-30 shadow-lg border-2 border-white">
            ❤️
          </div>
        )}
      </motion.div>
      
      <p className="mt-12 text-primary font-bold animate-pulse">
        {!isOpen ? "จดหมายลับสำหรับคุณ... (คลิกเปิด)" : "กำลังส่งมอบความรัก..."}
      </p>
    </div>
  );
};

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
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setShowModal(true), 1500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset envelope after a short delay so user can click it again
    setTimeout(() => setEnvelopeOpen(false), 500);
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "ไม่",
      "แน่ใจหรอ?",
      "คิดดูอีกทีนะ",
      "เสียใจจัง...",
      "ได้โปรดดด",
      "จะร้องไห้แล้วนะ",
      "ใจร้ายยย",
      "ฮือออออ",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const yesButtonSize = noCount * 20 + 16;

  const celebrate = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
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
          className={`min-h-screen w-full flex flex-col relative font-['Outfit'] overflow-x-hidden transition-colors duration-1000 ${yesPressed ? 'bg-base-200' : 'bg-black'}`}
          data-theme={yesPressed ? "valentine" : "black"}
        >
          {/* Decorative background elements */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 z-0">
            <div className={`absolute top-10 left-10 w-32 h-32 rounded-full mix-blend-multiply filter blur-3xl animate-blob ${yesPressed ? 'bg-primary' : 'bg-white/10'}`}></div>
            <div className={`absolute top-10 right-10 w-32 h-32 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 ${yesPressed ? 'bg-secondary' : 'bg-white/5'}`}></div>
            <div className={`absolute -bottom-8 left-20 w-32 h-32 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 ${yesPressed ? 'bg-accent' : 'bg-white/10'}`}></div>
          </div>

          {/* Header Marquee */}
          <div className={`w-full z-10 shadow-sm border-b backdrop-blur-sm flex-none transition-colors duration-1000 ${yesPressed ? 'border-primary/10 bg-base-100/50' : 'border-white/10 bg-black/50'}`}>
            <ScrollingWavyText text={yesPressed ? "I LOVE YOU YAYEE" : "WILL YOU BE MINE?"} direction="right" />
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
              className={`card w-full max-w-sm md:max-w-md bg-base-100/80 backdrop-blur-md shadow-2xl border-4 min-h-[300px] flex items-center justify-center transition-all duration-1000 ${yesPressed ? 'border-base-100' : 'border-white/20'}`}
            >
              <div className="card-body items-center text-center p-6 w-full overflow-visible">
                {yesPressed ? (
                  <LetterEnvelope isOpen={envelopeOpen} onOpen={handleOpenEnvelope} />
                ) : (
                  <>
                    <h2 className="card-title text-white text-2xl font-bold mb-6">จะเป็นวาเลนไทน์ให้กันมั้ย? 🌹</h2>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
                      <button 
                        className="btn btn-primary text-lg shadow-lg shadow-primary/30" 
                        style={{ fontSize: yesButtonSize }}
                        onClick={() => {
                          setYesPressed(true);
                          celebrate();
                        }}
                      >
                        ตกลง 💖
                      </button>
                      <button 
                        className="btn btn-ghost text-lg text-white/70 hover:text-white"
                        onClick={handleNoClick}
                      >
                        {getNoButtonText()}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

          </div>

          {/* Footer Marquee */}
          <div className={`w-full z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t backdrop-blur-sm flex-none transition-colors duration-1000 ${yesPressed ? 'border-primary/10 bg-base-100/50' : 'border-white/10 bg-black/50'}`}>
            <ScrollingWavyText text={yesPressed ? "I LOVE YOU YAYEE" : "WILL YOU BE MINE?"} direction="right" />
          </div>

          {/* DaisyUI Modal - Moved to root level */}
          <dialog id="love_letter_modal" className={`modal ${showModal ? 'modal-open' : ''}`}>
            <div className="modal-box bg-white border-4 border-primary p-0 overflow-hidden max-w-lg shadow-2xl">
              <div className="bg-primary p-4 text-white text-center">
                <h3 className="font-bold text-2xl uppercase tracking-[0.2em]">Our Secret Letter</h3>
              </div>
              <div className="p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={showModal ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl font-['Outfit'] font-bold text-primary mb-6 italic">ถึง... ยายีผู้เป็นที่รัก 💖</h2>
                  <div className="space-y-4 text-left font-['Outfit'] text-lg text-gray-700 leading-relaxed">
                    <p>ตั้งแต่วันแรกที่ได้รู้จักกัน โลกของเค้าก็น่าอยู่ขึ้นเยอะเลย</p>
                    <p>ขอบคุณที่เป็นความสุขในทุกๆ วัน ขอบคุณที่คอยซัพพอร์ตกันเสมอ</p>
                    <p>ไม่ว่าจะเจอเรื่องอะไร อยากให้รู้ว่ามีเค้าอยู่ข้างๆ ตลอดไปนะ</p>
                    <p>จะรักและดูแลเธอให้ดีที่สุดเลย สัญญาครับ!</p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-primary/20 flex flex-col items-end">
                    <p className="text-primary font-bold italic text-xl">รักที่สุดเลยนะ</p>
                    <p className="text-sm text-gray-400 mt-1">14 February 2026</p>
                  </div>
                </motion.div>
              </div>
              <div className="modal-action p-4 bg-gray-50 m-0">
                <button className="btn btn-primary w-full" onClick={handleCloseModal}>
                  ปิดกล่องแห่งความรัก 💖
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={handleCloseModal}>close</button>
            </form>
          </dialog>
        </motion.div>
      )}
    </>
  );
}

export default App;