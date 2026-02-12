import { motion } from "framer-motion";
import items from "../data/bucketlist.json";

const BucketList = () => {

  return (
    <div className="w-full max-w-xl mb-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-center mb-8 text-primary font-['Outfit']">Our Bucket List 📝</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 group"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              item.completed ? "bg-primary border-primary" : "border-primary/40 group-hover:border-primary"
            }`}>
              {item.completed && <span className="text-white text-xs">✓</span>}
            </div>
            <span className={`text-lg font-medium transition-all ${
              item.completed ? "text-primary/40 line-through" : "text-primary group-hover:translate-x-1"
            }`}>
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-primary/10 text-center">
        <p className="text-primary/40 italic text-sm">“จะค่อยๆ ทำทุกอย่างในลิสต์นี้ให้สำเร็จไปด้วยกันนะ”</p>
      </div>
    </div>
  );
};

export default BucketList;
