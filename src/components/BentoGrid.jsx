import { motion } from "framer-motion";

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 w-full max-w-4xl mb-8 h-[500px] md:h-[600px]">
      {/* Large item */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-2 row-span-2 rounded-[32px] overflow-hidden shadow-2xl border-2 border-primary/20 relative group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-6 flex items-end text-left">
            <p className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">The first time we met... ❤️</p>
        </div>
        <img src="https://placehold.co/800x800?text=Us+💖" alt="Main Memory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </motion.div>
      
      {/* Vertical item */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="col-span-1 row-span-2 rounded-[32px] overflow-hidden shadow-2xl border-2 border-primary/20 relative group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img src="https://placehold.co/400x800?text=Together" alt="Memory 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </motion.div>
      
      {/* Small item 1 */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="col-span-1 row-span-1 rounded-[24px] overflow-hidden shadow-xl border-2 border-primary/20 relative group cursor-pointer"
      >
        <img src="https://placehold.co/400x400?text=Cute" alt="Memory 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
      </motion.div>

      {/* Small item 2 */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="col-span-1 row-span-1 rounded-[24px] overflow-hidden shadow-xl border-2 border-primary/20 relative group cursor-pointer"
      >
        <img src="https://placehold.co/400x400?text=Love" alt="Memory 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
      </motion.div>

      {/* Horizontal item */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="col-span-2 row-span-1 rounded-[32px] overflow-hidden shadow-2xl border-2 border-primary/20 relative group cursor-pointer"
      >
        <img src="https://placehold.co/800x400?text=Our+Happy+Place" alt="Memory 5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </motion.div>

      {/* Small item 3 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="col-span-1 row-span-1 rounded-[24px] overflow-hidden shadow-xl border-2 border-primary/20 relative group cursor-pointer"
      >
        <img src="https://placehold.co/400x400?text=Happy" alt="Memory 6" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
      </motion.div>

      {/* Small item 4 */}
      <motion.div 
        initial={{ opacity: 0, rotate: -5 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="col-span-1 row-span-1 rounded-[24px] overflow-hidden shadow-xl border-2 border-primary/20 relative group cursor-pointer"
      >
        <img src="https://placehold.co/400x400?text=Forever" alt="Memory 7" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
      </motion.div>
    </div>
  );
};

export default BentoGrid;
