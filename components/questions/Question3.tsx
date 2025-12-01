"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { cn } from "@/lib/utils";

export const Question3 = ({ onNext }: { onNext: (val: string) => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "yolo", label: "Me chupa un huevo", style: "border-neon-lime text-neon-lime" },
    { id: "die", label: "Me muero", style: "border-passion text-passion" },
    { id: "hide", label: "Me escondo en Gesell", style: "border-electric-cyan text-electric-cyan" },
  ];

  return (
    <div className="space-y-8 text-center">
      <h2 className="text-2xl md:text-3xl font-display font-bold">
        ¿Te lo bancás si sale para el orto?
      </h2>

      <div className="flex flex-col gap-4">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            whileHover={{ x: 10 }}
            onClick={() => setSelected(opt.id)}
            className={cn(
              "p-6 rounded-xl border-2 text-xl font-bold uppercase tracking-wider text-left transition-all duration-300",
              opt.style,
              selected === opt.id ? "bg-white/10 shadow-lg scale-105" : "bg-transparent opacity-70 hover:opacity-100"
            )}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>

      <NeonButton
        onClick={() => selected && onNext(selected)}
        className={cn("w-full mt-4 transition-opacity", !selected && "opacity-50 pointer-events-none")}
      >
        Confirmar
      </NeonButton>
    </div>
  );
};
