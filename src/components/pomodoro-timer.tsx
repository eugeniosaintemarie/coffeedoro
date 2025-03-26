'use client';

import { useState, useEffect } from 'react';
import CoffeeCup from "@/components/coffee-cup";
import { TimerDisplay } from './timer-display';
import { TimerControls } from './timer-controls';
import { useToast } from '../hooks/use-toast';

export function PomodoroTimer({
  initialWorkTime = 25,
  initialBreakTime = 5
}: {
  initialWorkTime: number;
  initialBreakTime: number;
}) {
  const [isWorking, setIsWorking] = useState(true);
  const [timeLeft, setTimeLeft] = useState(initialWorkTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerEnd();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerEnd = () => {
    setIsRunning(false);
    toast({
      title: isWorking ? '¡Tiempo completo!' : '¡Descanso terminado!',
      description: isWorking 
        ? 'Es hora de un descanso ☕' 
        : 'Volvamos al trabajo 💪',
    });
    
    const newMode = !isWorking;
    setIsWorking(newMode);
    setTimeLeft(newMode ? initialWorkTime * 60 : initialBreakTime * 60);
  };

  const progress = isWorking 
  ? (timeLeft / (initialWorkTime * 60)) * 100
  : 100 - (timeLeft / (initialBreakTime * 60)) * 100;

  return (
    <div className="flex flex-col items-center gap-8">
      <CoffeeCup progress={progress} />
      
      <TimerDisplay 
        timeLeft={timeLeft} 
        isWorking={isWorking} 
      />
      
      <TimerControls
        isRunning={isRunning}
        onStartPause={() => setIsRunning(!isRunning)}
        onReset={() => {
          setIsRunning(false);
          setTimeLeft(isWorking ? initialWorkTime * 60 : initialBreakTime * 60);
        }}
      />
    </div>
  );
}