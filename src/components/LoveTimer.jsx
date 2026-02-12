import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoveTimer = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const start = new Date(startDate);
      const difference = now - start;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6 group">
      <motion.div 
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.1, textShadow: "0 0 20px rgba(255, 30, 86, 0.5)" }}
        className="text-4xl md:text-7xl font-black text-primary transition-all tabular-nums"
      >
        {value}
      </motion.div>
      <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/40 mt-2 group-hover:text-primary transition-colors">{label}</div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl bg-white/[0.03] backdrop-blur-2xl rounded-[40px] p-10 md:p-16 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      {/* Decorative background element inside the card */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
      
      <h3 className="text-sm md:text-base text-center mb-10 font-bold text-primary/60 uppercase tracking-[0.5em] italic">We've been together for</h3>
      
      <div className="flex justify-center items-center flex-wrap gap-y-8">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="text-2xl md:text-4xl text-primary/20 font-light mt-[-20px] hidden md:block select-none">:</div>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div className="text-2xl md:text-4xl text-primary/20 font-light mt-[-20px] hidden md:block select-none">:</div>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <div className="text-2xl md:text-4xl text-primary/20 font-light mt-[-20px] hidden md:block select-none">:</div>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
      
      <div className="mt-12 flex flex-col items-center">
        <div className="w-12 h-[1px] bg-primary/20 mb-6" />
        <p className="text-center text-primary/50 italic text-sm md:text-lg max-w-sm font-medium leading-relaxed">
          “Every second with you is a gift I'll cherish forever.”
        </p>
      </div>
    </div>
  );
};

export default LoveTimer;
