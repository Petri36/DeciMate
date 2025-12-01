"use client";

import { useParams, useRouter } from "next/navigation";
import { useDecision } from "@/context/DecisionContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { Question1 } from "@/components/questions/Question1";
import { Question2 } from "@/components/questions/Question2";
import { Question3 } from "@/components/questions/Question3";
import { Question4 } from "@/components/questions/Question4";
import { Question5 } from "@/components/questions/Question5";
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const { setAnswer } = useDecision();
  
  // Handle the case where params.id might be an array or undefined
  const idParam = params?.id;
  const id = typeof idParam === 'string' ? parseInt(idParam) : 1;

  const handleNext = (answer: any) => {
    setAnswer(id, answer);
    if (id < 5) {
      router.push(`/question/${id + 1}`);
    } else {
      router.push("/result");
    }
  };

  const renderQuestion = () => {
    switch (id) {
      case 1:
        return <Question1 onNext={handleNext} />;
      case 2:
        return <Question2 onNext={handleNext} />;
      case 3:
        return <Question3 onNext={handleNext} />;
      case 4:
        return <Question4 onNext={handleNext} />;
      case 5:
        return <Question5 onNext={handleNext} />;
      default:
        return <div>Pregunta no encontrada</div>;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-electric-cyan/10 via-void to-void z-0" />
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-cumbia-violet to-electric-cyan"
          initial={{ width: `${((id - 1) / 5) * 100}%` }}
          animate={{ width: `${(id / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <GlassCard>
            <div className="mb-4 text-xs font-mono text-white/40 uppercase tracking-widest text-center">
              Pregunta {id} / 5
            </div>
            {renderQuestion()}
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
