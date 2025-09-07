import { useState, useEffect } from "react";

export const useLoadingProgress = (duration = 3000) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    // Simulazione progressione realistica con pause e accelerazioni
    const progressSteps = [
      { progress: 0, delay: 0 },
      { progress: 15, delay: 200 },
      { progress: 25, delay: 400 },
      { progress: 35, delay: 600 },
      { progress: 50, delay: 1000 }, // Pausa più lunga a metà
      { progress: 65, delay: 1300 },
      { progress: 80, delay: 1600 },
      { progress: 90, delay: 2000 },
      { progress: 95, delay: 2400 },
      { progress: 100, delay: 2800 },
    ];

    const timers = progressSteps.map(({ progress: targetProgress, delay }) => {
      return setTimeout(() => {
        setProgress(targetProgress);

        if (targetProgress === 100) {
          setTimeout(() => {
            setIsComplete(true);
          }, 500);
        }
      }, delay);
    });

    // Cleanup timers
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [duration]);

  return { progress, isComplete };
};
