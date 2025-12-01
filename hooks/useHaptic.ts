"use client";

import { useCallback } from "react";

export const useHaptic = () => {
  const vibrate = useCallback((pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  const trigger = {
    success: () => vibrate([10, 30, 10]),
    error: () => vibrate([50, 30, 50, 30, 50]),
    warning: () => vibrate([30, 30, 30]),
    light: () => vibrate(10),
    medium: () => vibrate(30),
    heavy: () => vibrate(50),
  };

  return { trigger };
};
