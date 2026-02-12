import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Heart } from "lucide-react";
import musicFile from "../assets/Djai.mp3";

const MusicPlayer = ({ autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1); 
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const musicUrl = musicFile; 

  // Auto-play when autoPlay prop changes to true
  useEffect(() => {
    if (autoPlay && !isPlaying && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Auto-play blocked or failed", err));
    }
  }, [autoPlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("User must interact first", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-24 right-8 z-[100] flex items-end gap-3 flex-row-reverse">
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
      />
      
      {/* Main Music Bubble */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer group"
        onClick={togglePlay}
      >
        {/* Glow Effect */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-primary rounded-full blur-xl"
            />
          )}
        </AnimatePresence>

        {/* Bubble Skin */}
        <div className={`w-16 h-16 rounded-full border-4 ${isPlaying ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(255,107,107,0.3)]' : 'border-white/20 bg-black/40'} backdrop-blur-md flex items-center justify-center relative shadow-2xl overflow-hidden transition-all duration-500`}>
          <motion.div 
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="text-white z-10"
          >
             {isPlaying ? <Music size={26} /> : <VolumeX size={26} className="opacity-30" />}
          </motion.div>

          {/* Inline Visualizer bars */}
          {isPlaying && (
            <div className="absolute bottom-2.5 flex gap-0.5 items-end h-3 pointer-events-none">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ height: volume > 0 ? [3, 10 * volume + 2, 5 * volume + 2, 12 * volume + 2, 3] : 2 }}
                  transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                  className="w-0.5 bg-white/50 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Hearts Animation */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ scale: [1, 1.5, 0], opacity: [1, 0.8, 0], y: -60, x: [0, 20, -20] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 right-0 text-primary pointer-events-none"
            >
              <Heart size={16} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Tooltip */}
        <AnimatePresence>
          {isHovered && !showVolume && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute -left-28 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 text-white whitespace-nowrap hidden md:block"
            >
              {isPlaying ? "PAUSE MUSIC" : "PLAY MUSIC"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Volume Control Group */}
      <div className="flex flex-col items-center gap-2">
        <AnimatePresence>
          {showVolume && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-black/60 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl h-32 flex flex-col items-center"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="accent-primary h-24 w-1 cursor-pointer appearance-none bg-white/10 rounded-full"
                style={{ WebkitAppearance: 'slider-vertical' }}
              />
              <div className="mt-2 text-[9px] font-black text-white/40 font-mono">
                {Math.round(volume * 100)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume Toggle Mini-Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowVolume(!showVolume)}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center backdrop-blur-md transition-all shadow-xl ${
            showVolume ? 'bg-primary border-primary text-white' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'
          }`}
        >
          {volume > 0.5 ? <Volume2 size={16} /> : volume > 0 ? <Music size={16} /> : <VolumeX size={16} />}
        </motion.button>
      </div>

    </div>
  );
};

export default MusicPlayer;
