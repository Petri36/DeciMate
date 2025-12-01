"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "danger" | "success" | "ghost";
  children: React.ReactNode;
}

export const NeonButton = ({
  className,
  variant = "primary",
  children,
  ...props
}: NeonButtonProps) => {
  const variants = {
    primary: "border-cumbia-violet text-cumbia-violet hover:bg-cumbia-violet/10 shadow-[0_0_15px_rgba(162,89,255,0.3)] hover:shadow-[0_0_25px_rgba(162,89,255,0.6)]",
    danger: "border-passion text-passion hover:bg-passion/10 shadow-[0_0_15px_rgba(224,30,90,0.3)] hover:shadow-[0_0_25px_rgba(224,30,90,0.6)]",
    success: "border-neon-lime text-neon-lime hover:bg-neon-lime/10 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)]",
    ghost: "border-transparent text-white/60 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-8 py-4 rounded-xl border-2 font-display font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
