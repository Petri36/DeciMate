"use client";

import { MateLogo } from "@/components/ui/MateLogo";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cumbia-violet/10 via-void to-void z-0" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 z-0" />

      <div className="z-10 flex flex-col items-center gap-12 max-w-md w-full text-center">
        <MateLogo className="scale-150 mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            Tomá decisiones <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-cumbia-violet text-glow-cyan">
              sin chamuyar
            </span>
          </h2>
          <p className="text-white/60 text-lg font-light">
            La IA que te canta la justa en 15 segundos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="w-full"
        >
          <Link href="/question/1">
            <NeonButton className="w-full text-lg">
              Empezar a decidir, loco
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
