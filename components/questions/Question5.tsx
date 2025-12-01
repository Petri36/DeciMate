"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { cn } from "@/lib/utils";

export const Question5 = ({ onNext }: { onNext: (val: string) => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "hate", label: "Me va a putear en arameo", style: "border-passion text-passion" },
    { id: "meh", label: "Ni fu ni fa", style: "border-electric-cyan text-electric-cyan" },
    { id: "proud", label: "Me va a hacer un monumento", style: "border-neon-lime text-neon-lime" },
  ];

  return (
    <div className="space-y-8 text-center">
      <h2 className="text-2xl md:text-3xl font-display font-bold">
        ¿Tu yo del futuro te manda un audio puteándote?
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
