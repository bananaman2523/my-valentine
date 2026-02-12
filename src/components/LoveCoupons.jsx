import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import initialCoupons from "../data/coupons.json";

const LoveCoupons = () => {
    const [usedCoupons, setUsedCoupons] = useState(new Set());
    const containerRef = useRef(null);
    const coupons = initialCoupons;

    const handleUseCoupon = (index, coupon) => {
        if (usedCoupons.has(index)) return;
        
        const newUsed = new Set(usedCoupons);
        newUsed.add(index);
        setUsedCoupons(newUsed);

        // Specialized Effects based on coupon type
        switch (coupon.title) {
            case "One Free Hug":
                // Heart confetti
                const heart = confetti.shapeFromText({ text: '❤️', scalar: 3 });
                confetti({
                    particleCount: 50,
                    spread: 80,
                    origin: { y: 0.6 },
                    shapes: [heart],
                    scalar: 2
                });
                break;
            case "Romantic Dinner":
                // Food/Warm colors
                confetti({
                    particleCount: 150,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff9a9e', '#fecfef', '#fad0c4']
                });
                confetti({
                    particleCount: 150,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff9a9e', '#fecfef', '#fad0c4']
                });
                break;
            case "Movie Marathon":
                // Starry cinematic effect
                const star = confetti.shapeFromText({ text: '⭐', scalar: 2 });
                confetti({
                    particleCount: 80,
                    spread: 120,
                    origin: { y: 0.7 },
                    shapes: [star],
                    colors: ['#ffffff', '#000000', '#ffd700']
                });
                break;
            case "Day of Compliments":
                // Shimmering sparkles
                const duration = 3 * 1000;
                const end = Date.now() + duration;
                (function frame() {
                    confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#FFE700', '#FFF500']
                    });
                    confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#FFE700', '#FFF500']
                    });
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
                break;
            case "Argument Winner":
                // Blue "Peace" winner blast
                confetti({
                    particleCount: 200,
                    spread: 160,
                    origin: { y: 0.6 },
                    colors: ['#00d2ff', '#3a7bd5', '#ffffff']
                });
                break;
            case "Surprise Gift":
                // Rainbow surprise
                confetti({
                    particleCount: 250,
                    spread: 360,
                    origin: { y: 0.5 },
                    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
                });
                break;
            default:
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff1e56', '#ffacb7', '#ffffff']
                });
        }
    };

    return (
        <div className="w-full max-w-4xl mb-12" ref={containerRef}>
            <h3 className="text-2xl font-bold text-center mb-12 text-primary uppercase tracking-[0.2em]">Love Coupons 🎟️</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons.map((coupon, index) => {
                    const isUsed = usedCoupons.has(index);
                    return (
                        <motion.div
                            key={index}
                            onClick={() => handleUseCoupon(index, coupon)}
                            whileHover={!isUsed ? { y: -8, scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 } : {}}
                            whileTap={!isUsed ? { scale: 0.98 } : {}}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${coupon.color} border-2 border-dashed rounded-[24px] p-8 relative overflow-hidden group shadow-lg transition-all duration-300 ${isUsed ? 'opacity-40 grayscale pointer-events-none' : 'cursor-pointer'}`}
                        >
                            {/* USED Stamp Overlay */}
                            <AnimatePresence>
                                {isUsed && (
                                    <motion.div 
                                        initial={{ scale: 2, opacity: 0, rotate: -25 }}
                                        animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                                    >
                                        <div className="border-4 border-red-500 text-red-500 font-black px-6 py-2 text-4xl uppercase tracking-tighter rounded-lg bg-white/90 shadow-2xl skew-x-[-10deg]">
                                            REDEEMED
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Scalloped edges effect */}
                            <div className="absolute top-0 bottom-0 -left-3 flex flex-col justify-around">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`w-6 h-6 bg-base-200 rounded-full -ml-3 shadow-inner`} />
                                ))}
                            </div>
                            <div className="absolute top-0 bottom-0 -right-3 flex flex-col justify-around">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`w-6 h-6 bg-base-200 rounded-full -mr-3 shadow-inner`} />
                                ))}
                            </div>

                            <div className="flex flex-col items-center text-center select-none">
                                <motion.div 
                                    animate={!isUsed ? { y: [0, -4, 0] } : {}}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-5xl mb-6 filter drop-shadow-md"
                                >
                                    {coupon.icon}
                                </motion.div>
                                <h4 className="font-black text-gray-800 uppercase tracking-tight text-xl mb-3 leading-tight">{coupon.title}</h4>
                                <p className="text-sm text-gray-600 font-medium italic opacity-80">{coupon.desc}</p>
                                
                                <div className="mt-8 pt-6 border-t border-black/5 w-full">
                                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <span>Valued Guest</span>
                                        <span>No. {index + 100}</span>
                                    </div>
                                    <div className="mt-2 text-[9px] text-gray-300 font-mono overflow-hidden whitespace-nowrap opacity-50">
                                        {isUsed ? "REDEEMED ON " + new Date().toLocaleDateString() : "•••• •••• •••• ••••"}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            
            <p className="text-center mt-12 text-primary/40 font-black italic text-sm tracking-widest uppercase">
                “Infinite Love Exchange Policy Applies” 💖
            </p>
        </div>
    );
};

export default LoveCoupons;
