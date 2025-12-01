"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DecisionContextType {
  decision: string;
  setDecision: (d: string) => void;
  answers: Record<number, any>;
  setAnswer: (questionId: number, answer: any) => void;
  reset: () => void;
}

const DecisionContext = createContext<DecisionContextType | undefined>(undefined);

export const DecisionProvider = ({ children }: { children: ReactNode }) => {
  const [decision, setDecision] = useState("");
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const setAnswer = (questionId: number, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const reset = () => {
    setDecision("");
    setAnswers({});
  };

  return (
    <DecisionContext.Provider value={{ decision, setDecision, answers, setAnswer, reset }}>
      {children}
    </DecisionContext.Provider>
  );
};

export const useDecision = () => {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error("useDecision must be used within a DecisionProvider");
  }
  return context;
};
