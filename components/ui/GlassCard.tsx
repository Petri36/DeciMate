"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const GlassCard = ({ className, children, ...props }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "glass-panel rounded-3xl p-8 w-full max-w-md mx-auto relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cumbia-violet/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-electric-cyan/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
