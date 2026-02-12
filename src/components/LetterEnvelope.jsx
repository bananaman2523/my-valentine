import { motion } from "framer-motion";

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

export default LetterEnvelope;
