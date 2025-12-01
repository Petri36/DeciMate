"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";

export const Question1 = ({ onNext }: { onNext: (val: number) => void }) => {
  const [value, setValue] = useState(0);

  const getEmoji = (val: number) => {
    if (val < -3) return "🤩"; // Cara de ortiva feliz (golazo)
    if (val < 0) return "😏"; // Interesante
    if (val === 0) return "😐"; // Meh
    if (val < 3) return "🤨"; // Dudoso
    return "🤢"; // Cara de orto mal
  };

  return (
    <div className="space-y-12 text-center">
      <h2 className="text-2xl md:text-3xl font-display font-bold">
        ¿Te da cosita en la panza cuando lo pensás?
      </h2>

      <div className="relative py-8">
        <div className="text-6xl mb-8 animate-bounce">{getEmoji(value)}</div>
        
        <input
          type="range"
          min="-5"
          max="5"
          step="1"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cumbia-violet hover:accent-electric-cyan transition-all"
        />
        
        <div className="flex justify-between text-sm text-white/50 mt-4 font-mono">
          <span>Ni en pedo</span>
          <span>Re sí</span>
        </div>
      </div>

      <NeonButton onClick={() => onNext(value)} className="w-full">
        Confirmar
      </NeonButton>
    </div>
  );
};
