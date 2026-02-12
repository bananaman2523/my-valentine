import { useState } from "react";
import { motion } from "framer-motion";

const PasswordScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === "hongtae") {
      onLogin();
    } else {
      setError(true);
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
        <h2 className="text-3xl font-bold mb-8 tracking-widest uppercase">
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

export default PasswordScreen;
