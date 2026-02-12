import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PasswordScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === "yayee") {
      setErrorMessage("");
      onLogin();
    } else {
      setError(true);
      setErrorMessage("อุ๊ย! ไม่ใช่ชื่อนี้ครับ ลองใหม่นะ 🥺");
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white p-4"
    >
      <div className="w-full max-w-xs text-center">
        <h2 className="text-3xl font-bold mb-8 tracking-widest uppercase">
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
              placeholder="Enter your name..."
              className="w-full bg-transparent border-b-2 border-white/30 p-3 text-center text-xl outline-none placeholder:text-white/20 focus:border-white transition-colors"
              autoFocus
            />
          </motion.div>
          
          <AnimatePresence>
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-primary font-bold text-sm"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
          
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

export default PasswordScreen;
