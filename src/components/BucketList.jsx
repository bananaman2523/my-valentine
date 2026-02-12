import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import initialItems from "../data/bucketlist.json";

const BucketList = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("valentine_bucket_list");
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("valentine_bucket_list", JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newItem = { text: inputValue.trim(), completed: false };
    setItems([...items, newItem]);
    setInputValue("");
  };

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-xl mb-12 bg-white/5 backdrop-blur-xl border border-white/20 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700" />
      
      <h3 className="text-3xl font-black text-center mb-10 text-primary uppercase tracking-[0.2em] italic">Our Bucket List 📝</h3>
      
      <div className="space-y-3 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.text + index}
              layout
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group/item"
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  item.completed 
                    ? "bg-primary border-primary shadow-[0_0_15px_rgba(255,107,107,0.5)]" 
                    : "border-primary/40 group-hover:border-primary group-hover:scale-110"
                }`}
              >
                {item.completed && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-sm font-bold">✓</motion.span>}
              </button>
              
              <span 
                onClick={() => toggleItem(index)}
                className={`text-lg font-bold flex-grow cursor-pointer select-none transition-all duration-500 ${
                  item.completed ? "text-primary/30 line-through italic" : "text-white/90"
                }`}
              >
                {item.text}
              </span>

              <button 
                onClick={() => removeItem(index)}
                className="opacity-0 group-hover/item:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all scale-75 group-hover/item:scale-100"
              >
                <span className="text-xl">✕</span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={addItem} className="relative mt-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new dream..."
          className="w-full bg-white/10 border-2 border-dashed border-white/20 rounded-2xl py-4 px-6 pr-16 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/15 transition-all font-bold italic"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <span className="text-2xl font-black">+</span>
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-white/10 text-center">
        <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-2">Our Journey Together</p>
        <p className="text-white/30 italic text-sm">
          “{items.filter(i => i.completed).length} items done, many more to go with you.”
        </p>
      </div>
    </div>
  );
};

export default BucketList;
