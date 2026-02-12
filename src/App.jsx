import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Internal Components
import PasswordScreen from "./components/PasswordScreen";
import ScrollingWavyText from "./components/ScrollingWavyText";
import BentoGrid from "./components/BentoGrid";
import LetterEnvelope from "./components/LetterEnvelope";
import LoveTimer from "./components/LoveTimer";
import ReasonJar from "./components/ReasonJar";
import LoveCoupons from "./components/LoveCoupons";
import BucketList from "./components/BucketList";

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
          {/* Decorative background elements - enhanced */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <motion.div 
              animate={{ 
                x: [0, 50, -30, 0],
                y: [0, -50, 40, 0],
                scale: [1, 1.2, 0.9, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute top-[10%] left-[10%] w-64 md:w-96 h-64 md:h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-40 ${yesPressed ? 'bg-primary' : 'bg-white/10'}`}
            />
            <motion.div 
              animate={{ 
                x: [0, -60, 40, 0],
                y: [0, 40, -60, 0],
                scale: [1, 1.1, 1.2, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className={`absolute top-[20%] right-[10%] w-64 md:w-96 h-64 md:h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-30 ${yesPressed ? 'bg-secondary' : 'bg-white/5'}`}
            />
            <motion.div 
              animate={{ 
                x: [0, 40, -50, 0],
                y: [0, 60, -30, 0],
                scale: [1, 1.3, 0.8, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className={`absolute bottom-[10%] left-[20%] w-64 md:w-96 h-64 md:h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-40 ${yesPressed ? 'bg-accent' : 'bg-white/10'}`}
            />
            <motion.div 
              animate={{ 
                x: [0, -30, 60, 0],
                y: [0, -70, 20, 0],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className={`absolute bottom-[15%] right-[20%] w-48 h-48 rounded-full mix-blend-screen filter blur-[80px] opacity-20 ${yesPressed ? 'bg-primary' : 'bg-white/5'}`}
            />
          </div>

          {/* Header Marquee */}
          <div className={`w-full z-20 shadow-xl border-b backdrop-blur-md flex-none transition-colors duration-1000 fixed top-0 ${yesPressed ? 'border-primary/10 bg-base-100/30' : 'border-white/10 bg-black/30'}`}>
            <ScrollingWavyText text={yesPressed ? "HAPPY VALENTINE'S DAY YAYEE ❤️ I LOVE YOU SO MUCH" : "WAITING FOR YOUR ANSWER... WILL YOU BE MINE?"} direction="right" />
          </div>

          {/* Main Content */}
          <div className={`flex-grow w-full z-10 overflow-y-auto overflow-x-hidden ${!yesPressed ? 'flex items-center justify-center' : 'pt-32 pb-48'}`}>
            <div className={`w-full ${yesPressed ? 'max-w-5xl mx-auto px-4 space-y-32 flex flex-col items-center' : 'flex flex-col items-center'}`}>
              
              {!yesPressed ? (
                  <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full max-w-lg px-4"
                  >
                      <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="card w-full bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20 p-10 md:p-16 items-center text-center relative overflow-hidden group"
                      >
                          {/* Inner glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />
                          
                          <motion.h2 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="card-title text-white text-3xl md:text-2xl font-black mb-12 tracking-tight leading-tight"
                          >
                            จะไปเที่ยววันวาเลนไทน์กันไหมม? 🌹
                          </motion.h2>

                          <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full mt-4">
                              <motion.button 
                                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 30, 86, 0.6)" }}
                                  whileTap={{ scale: 0.95 }}
                                  className="btn btn-primary btn-lg text-2xl h-auto py-6 px-12 rounded-full shadow-2xl border-none font-black tracking-widest" 
                                  style={{ fontSize: yesButtonSize }}
                                  onClick={() => {
                                      setYesPressed(true);
                                      celebrate();
                                  }}
                              >
                                  ตกลง 💖
                              </motion.button>
                              <button 
                                  className="btn btn-ghost btn-lg text-xl text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
                                  onClick={handleNoClick}
                              >
                                  {getNoButtonText()}
                              </button>
                          </div>
                      </motion.div>
                  </motion.div>
              ) : (
                  <>
                      {/* Love Timer Section */}
                      {/* <motion.section 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="w-full flex justify-center"
                      >
                          <LoveTimer startDate="2023-01-01" />
                      </motion.section> */}

                      {/* Bento Grid Section */}
                      <motion.section 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="w-full flex flex-col items-center"
                      >
                          <div className="flex flex-col items-center mb-16">
                              <h2 className="text-4xl md:text-6xl font-black text-center mb-4 text-primary italic uppercase tracking-tighter">Our Beautiful Memories</h2>
                              <div className="w-24 h-1 bg-primary rounded-full" />
                          </div>
                          <div className="w-full flex justify-center">
                            <BentoGrid />
                          </div>
                      </motion.section>

                      {/* Interactive Jar */}
                      <motion.section 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1 }}
                          className="w-full flex justify-center"
                      >
                           <ReasonJar />
                      </motion.section>

                      {/* Coupons */}
                      <motion.section 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1 }}
                          className="w-full flex justify-center"
                      >
                           <LoveCoupons />
                      </motion.section>


                      {/* Final Action - Letter */}
                      <motion.section 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="w-full flex flex-col items-center"
                      >
                          <div className="text-2xl font-bold text-primary mb-8 italic">You have one unread message...</div>
                          <LetterEnvelope isOpen={envelopeOpen} onOpen={handleOpenEnvelope} />
                      </motion.section>
                  </>
              )}
            </div>
          </div>

          {/* Footer Marquee */}
          <div className={`w-full z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t backdrop-blur-sm flex-none transition-colors duration-1000 fixed bottom-0 ${yesPressed ? 'border-primary/10 bg-base-100/50' : 'border-white/10 bg-black/50'}`}>
            <ScrollingWavyText text={yesPressed ? "I LOVE YOU YAYEE" : "WILL YOU BE MINE?"} direction="right" />
          </div>

          {/* DaisyUI Modal */}
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