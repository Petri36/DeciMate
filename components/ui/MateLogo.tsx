"use client";

import { motion } from "framer-motion";

export const MateLogo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glow Filter */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Mate Body - Circuit Style */}
        <motion.path
          d="M20 30 C20 10, 80 10, 80 30 L80 60 C80 85, 65 95, 50 95 C35 95, 20 85, 20 60 Z"
          stroke="#A259FF"
          strokeWidth="3"
          fill="rgba(11, 11, 31, 0.8)"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Bombilla */}
        <motion.path
          d="M75 25 L90 5"
          stroke="#00F0FF"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Steam / Binary Data */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -10 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <text x="45" y="15" fill="#39FF14" fontSize="8" fontFamily="monospace">1</text>
          <text x="55" y="10" fill="#E01E5A" fontSize="8" fontFamily="monospace">0</text>
        </motion.g>

        {/* Circuit Lines */}
        <motion.path
          d="M30 50 L70 50 M40 65 L60 65"
          stroke="#A259FF"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        />
      </motion.svg>
      <motion.div
        className="text-center mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h1 className="font-display font-bold text-3xl tracking-tighter text-white">
          Deci<span className="text-cumbia-violet">Mate</span>
        </h1>
      </motion.div>
    </div>
  );
};
