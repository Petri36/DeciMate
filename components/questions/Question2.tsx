"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { ThumbsUp, ThumbsDown, Skull } from "lucide-react";
import { cn } from "@/lib/utils";

export const Question2 = ({ onNext }: { onNext: (val: string) => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "approve", icon: ThumbsUp, label: "Pulgar Arriba", color: "text-neon-lime" },
    { id: "reject", icon: ThumbsDown, label: "Pulgar Abajo", color: "text-passion" },
    { id: "hell_no", icon: Skull, label: "Ni en pedo", color: "text-electric-cyan" },
  ];

  return (
    <div className="space-y-12 text-center">
      <h2 className="text-2xl md:text-3xl font-display font-bold">
        ¿Tu viejo te aprobaría esto?
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelected(opt.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300",
              selected === opt.id
                ? `bg-white/10 border-${opt.color.split("-")[1] === "neon" ? "neon-lime" : opt.color.split("-")[1] === "passion" ? "passion" : "electric-cyan"} shadow-[0_0_20px_rgba(255,255,255,0.2)]`
                : "border-white/10 hover:border-white/30"
            )}
          >
            <opt.icon className={cn("w-12 h-12 mb-2", opt.color)} />
            <span className="text-xs font-bold uppercase tracking-wider">{opt.label}</span>
          </motion.button>
        ))}
      </div>

      <NeonButton
        onClick={() => selected && onNext(selected)}
        className={cn("w-full transition-opacity", !selected && "opacity-50 pointer-events-none")}
      >
        Siguiente
      </NeonButton>
    </div>
  );
};
