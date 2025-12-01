"use client";

import { useEffect, useState } from "react";
import { useDecision } from "@/context/DecisionContext";
import { NeonButton } from "@/components/ui/NeonButton";
import { MateLogo } from "@/components/ui/MateLogo";
import { motion } from "framer-motion";
import { Share2, RefreshCw } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useHaptic } from "@/hooks/useHaptic";

export default function ResultPage() {
  const { answers, reset } = useDecision();
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shareText, setShareText] = useState("Compartir resultado");
  const { trigger } = useHaptic();

  const handleShare = async () => {
    trigger.light();
    const verdict = getVerdict(score);
    const shareContent = `🎯 DeciMate dice: ${verdict.text}\n\n📊 Probabilidad de éxito: ${score}%\n\n¿Tenés que decidir algo? Probá DeciMate 👉 ${window.location.origin}`;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi resultado en DeciMate',
          text: shareContent,
        });
        trigger.success();
      } catch (err) {
        // User cancelled or error occurred
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareContent);
        setShareText("¡Copiado!");
        trigger.success();
        setTimeout(() => setShareText("Compartir resultado"), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        setShareText("Error al copiar");
        trigger.error();
        setTimeout(() => setShareText("Compartir resultado"), 2000);
      }
    }
  };

  useEffect(() => {
    // Calculate Score Logic
    let calculatedScore = 50; // Base
    
    if (answers[1]) calculatedScore += answers[1] * -2; // Inverted logic for Q1 (High val = Bad)
    if (answers[2] === "approve") calculatedScore += 20;
    if (answers[2] === "hell_no") calculatedScore -= 20;
    if (answers[3] === "yolo") calculatedScore += 10;
    if (answers[3] === "hide") calculatedScore -= 10;
    if (answers[4]) calculatedScore += (answers[4] - 50) / 2.5;
    
    // Q5 Logic Update
    if (answers[5] === "proud") calculatedScore += 20;
    if (answers[5] === "hate") calculatedScore -= 20;
    
    // Clamp
    calculatedScore = Math.min(100, Math.max(0, calculatedScore));
    
    // Animate score up
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= calculatedScore) {
        current = calculatedScore;
        clearInterval(interval);
        setShowResult(true);
        trigger.medium();
        
        if (calculatedScore > 80) {
            trigger.success();
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#39FF14', '#A259FF', '#00F0FF']
            });
        } else if (calculatedScore < 30) {
            trigger.error();
        }
      }
      setScore(Math.floor(current));
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVerdict = (s: number) => {
    if (s < 20) return { text: "Ni en pedo, boludo", color: "text-passion", bg: "bg-passion/10" };
    if (s < 40) return { text: "Te vas a comer un garrón", color: "text-passion", bg: "bg-passion/10" };
    if (s < 60) return { text: "Y... es medio pelo", color: "text-electric-cyan", bg: "bg-electric-cyan/10" };
    if (s < 80) return { text: "Mandale mecha", color: "text-neon-lime", bg: "bg-neon-lime/10" };
    return { text: "Es un golazo de mitad de cancha", color: "text-neon-lime", bg: "bg-neon-lime/10" };
  };

  const verdict = getVerdict(score);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-1000 ${showResult ? verdict.bg : "bg-void"}`}>
      
      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/noise.png')]" />

      <div className="z-10 flex flex-col items-center gap-8 max-w-md w-full text-center">
        <MateLogo className="scale-75" />

        <div className="space-y-2">
          <h2 className="text-white/60 text-lg font-light">Tu veredicto:</h2>
        </div>

        <div className="relative">
          <motion.div
            className={`text-8xl font-display font-black tracking-tighter ${verdict.color} animate-glitch`}
          >
            {score}%
          </motion.div>
          <p className="text-sm font-mono text-white/40 uppercase tracking-widest mt-2">Probabilidad de éxito</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showResult ? 1 : 0, scale: showResult ? 1 : 0.8 }}
          className="space-y-6"
        >
          <div className="p-6 border-2 border-white/10 rounded-2xl bg-black/20 backdrop-blur-md">
            <h3 className={`text-3xl font-bold leading-tight ${verdict.color}`}>
              {verdict.text}
            </h3>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <NeonButton 
              variant="ghost" 
              className="w-full flex items-center justify-center gap-2 border-white/20"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              {shareText}
            </NeonButton>
            
            <Link href="/question/1" onClick={reset} className="w-full">
              <NeonButton variant="primary" className="w-full flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Decidir otra cosa
              </NeonButton>
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 text-xs text-white/30 font-mono">
          Powered by DeciMate
        </div>
      </div>
    </main>
  );
}
