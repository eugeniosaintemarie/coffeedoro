/**
 * Componente para mostrar el tiempo restante del temporizador
 * 
 * Este componente muestra el tiempo restante en formato MM:SS y
 * proporciona información visual sobre el estado actual del temporizador.
 */

"use client"

import { formatTime } from "@/lib/timerUtils"

interface TimerDisplayProps {
  /**
   * Tiempo restante en segundos
   */
  timeLeft: number
  
  /**
   * Indica si el temporizador está en periodo de trabajo o descanso
   */
  isWorking: boolean
  
  /**
   * Indica si el temporizador está activo o pausado
   */
  isActive: boolean
}

/**
 * Componente que muestra el tiempo restante del temporizador
 */
const TimerDisplay = ({ timeLeft, isWorking, isActive }: TimerDisplayProps) => {
  // Formatea el tiempo restante en formato MM:SS
  const formattedTime = formatTime(timeLeft)
  
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-4xl font-bold text-[#795548]">
        {formattedTime}
      </div>
    </div>
  )
}

export default TimerDisplay