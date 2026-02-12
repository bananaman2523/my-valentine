import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Gravity, { MatterBody } from "./fancy/physics/Gravity";

const PasswordScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [drops, setDrops] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === "yayee") {
      setErrorMessage("");
      setDrops([]);
      onLogin();
    } else {
      setError(true);
      setErrorMessage("อุ๊ย! ไม่ใช่ชื่อนี้ครับ ลองใหม่นะ 🥺");
      
      const messages = [
        "ไม่ถูกๆ",
        "มั่วแล้วววว",
        "ใครเนี่ยยย",
        "ใส่ชื่อผิดรึเปล่า",
        "ลองใหม่นะจ๊ะ",
        "ไม่ใช่เบบี้ของเค้า",
        "งงใส่ไรมาอะ",
        "แกเป็นใครวะะะ",
        "ถามรหัสเลยไหม",
        "ยื่นเรื่องกับ google ขอรหัสนะ"
      ];

      // Add a new drop - spawn INSIDE the screen bounds to avoid getting stuck above ceiling
      const newDrop = {
        id: Date.now(),
        x: `${Math.random() * 60 + 20}%`,
        y: "5%", 
        text: messages[Math.floor(Math.random() * messages.length)],
        color: ["bg-[#ff5941]", "bg-[#0015ff]", "bg-[#e794da]", "bg-[#1f464d]"][Math.floor(Math.random() * 4)]
      };
      setDrops(prev => [...prev.slice(-15), newDrop]);
      
      setTimeout(() => setError(false), 500);
    }
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white p-4 overflow-hidden"
    >
      {/* Physics Layer - Ensure it's behind the login box but visible */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Gravity key="login-gravity" gravity={{ x: 0, y: 1.2 }} className="w-full h-full">
          {drops.map((drop) => (
            <MatterBody
              key={drop.id}
              matterBodyOptions={{ 
                friction: 0.5, 
                restitution: 0.7, 
                density: 0.001 
              }}
              x={drop.x}
              y={drop.y}
            >
              <div className={`text-sm md:text-base ${drop.color} text-white rounded-full px-6 py-2 shadow-2xl whitespace-nowrap font-black border-2 border-white/20 select-none pointer-events-auto font-calendas italic`}>
                {drop.text}
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>

      <div className="w-full max-w-xs text-center relative z-10 bg-black/60 backdrop-blur-xl p-10 rounded-[32px] border border-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl font-black mb-8 tracking-tighter uppercase leading-tight">
          ใครครับเนี่ยใส่ชื่อก่อนนะครับ
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter Access Key..."
              className="w-full bg-white/5 border-b-2 border-white/30 p-4 text-center text-2xl font-black outline-none placeholder:text-white/10 focus:border-primary transition-all rounded-t-2xl uppercase tracking-widest"
              autoFocus
            />
          </motion.div>
          
          <div className="h-6">
            <AnimatePresence>
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-primary font-black text-xs uppercase tracking-widest"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 tracking-[0.4em] uppercase text-sm border-b-4 border-black/20"
          >
            ยืนยันตัวซะ
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default PasswordScreen;
