/**
 * Componente para los controles del temporizador
 * 
 * Este componente proporciona botones para iniciar, pausar y reiniciar el temporizador.
 */

"use client"

import { Play, Pause, RotateCcw } from "lucide-react"

interface TimerControlsProps {
  /**
   * Indica si el temporizador está activo o pausado
   */
  isActive: boolean
  
  /**
   * Función para iniciar el temporizador
   */
  onStart: () => void
  
  /**
   * Función para reiniciar el temporizador
   */
  onReset: () => void
}

/**
 * Componente que proporciona controles para el temporizador
 */
const TimerControls = ({ isActive, onStart, onReset }: TimerControlsProps) => {
  const handleButtonClick = () => {
    if (isActive) {
      // Si está activo, reiniciar
      onReset()
    } else {
      // Si no está activo, iniciar
      onStart()
    }
  }

  return (
    <button
      onClick={handleButtonClick}
      className="p-3 bg-[#212121] text-[#795548] rounded-full hover:bg-[#2c2c2c] transition-colors"
      aria-label={isActive ? "Reiniciar" : "Iniciar"}
    >
      {isActive ? <RotateCcw size={24} /> : <Play size={24} />}
    </button>
  )
}

export default TimerControls