/**
 * Componente principal del temporizador Pomodoro
 * 
 * Este componente integra todos los componentes del temporizador y
 * gestiona la lógica principal utilizando el hook personalizado useTimer.
 */

"use client"

import { useCallback } from "react"
import CoffeeCup from "@/components/coffee-cup"
import TimerDisplay from "@/components/timer-display"
import TimerControls from "@/components/timer-controls"
import TimerConfig from "@/components/timer-config"
import { useTimer } from "@/hooks/useTimer"

interface PomodoroTimerProps {
  /**
   * Tiempo inicial de trabajo en minutos
   */
  initialWorkTime?: number
  
  /**
   * Tiempo inicial de descanso en minutos
   */
  initialBreakTime?: number
}

/**
 * Componente principal que integra todos los componentes del temporizador Pomodoro
 */
const PomodoroTimer = ({
  initialWorkTime = 25,
  initialBreakTime = 5
}: PomodoroTimerProps) => {
  // Utiliza el hook personalizado para manejar la lógica del temporizador
  const [
    { timeLeft, isWorking, isActive, percentage, workTime, breakTime },
    { startTimer, resetTimer, updateWorkTime, updateBreakTime }
  ] = useTimer(initialWorkTime, initialBreakTime)

  /**
   * Maneja el cambio en los valores de tiempo
   */
  const handleValuesChange = useCallback(() => {
    // Esta función se llama cuando cambian los valores de tiempo
    // y el temporizador no está activo
  }, [])

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-8">
      {/* Taza de café animada */}
      <CoffeeCup percentage={percentage} isWorking={isWorking} isActive={isActive} timeLeft={timeLeft} />
      
      <div className="flex items-center gap-4 mt-4">
        {/* Controles del temporizador */}
        <TimerControls 
          isActive={isActive} 
          onStart={startTimer} 
          onReset={resetTimer} 
        />

        {/* Configuración del temporizador */}
        <TimerConfig
          workTime={workTime}
          breakTime={breakTime}
          onWorkTimeChange={updateWorkTime}
          onBreakTimeChange={updateBreakTime}
          isActive={isActive}
          onValuesChange={handleValuesChange}
        />
      </div>
    </div>
  )
}

export default PomodoroTimer