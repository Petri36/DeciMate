"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";

export const Question4 = ({ onNext }: { onNext: (val: number) => void }) => {
  const [value, setValue] = useState(50);

  const getLabel = (val: number) => {
    if (val < 25) return "Me voy a querer matar 💀";
    if (val < 50) return "Me va a dar cringe 😬";
    if (val < 75) return "Va a ser una anécdota 🤷‍♂️";
    return "Me voy a cagar de risa 😂";
  };

  return (
    <div className="space-y-12 text-center">
      <h2 className="text-2xl md:text-3xl font-display font-bold">
        ¿En 5 años te vas a reír o te vas a querer matar?
      </h2>

      <div className="relative py-12 px-4">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-full h-1 bg-gradient-to-r from-passion via-void to-neon-lime" />
        </div>

        <motion.div 
            className="text-xl font-bold mb-8 text-electric-cyan min-h-[3rem]"
            key={getLabel(value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {getLabel(value)}
        </motion.div>
        
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-electric-cyan hover:accent-cumbia-violet transition-all"
        />
        
        <div className="flex justify-between text-xs text-white/40 mt-4 font-mono uppercase tracking-widest">
          <span>Tragedia</span>
          <span>Comedia</span>
        </div>
      </div>

      <NeonButton onClick={() => onNext(value)} className="w-full">
        Confirmar
      </NeonButton>
    </div>
  );
};
