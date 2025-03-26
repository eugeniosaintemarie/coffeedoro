/**
 * Componente que representa una taza de café animada
 * 
 * Este componente muestra una taza de café con vapor cuando el temporizador
 * está activo, proporcionando una representación visual del estado del temporizador.
 */

"use client"

import { useRef } from "react"
import { formatTime } from "@/lib/timerUtils"

interface CoffeeCupProps {
  /**
   * Porcentaje de llenado de la taza (0-100)
   */
  percentage: number
  
  /**
   * Indica si el temporizador está en periodo de trabajo o descanso
   */
  isWorking: boolean
  
  /**
   * Indica si el temporizador está activo o pausado
   */
  isActive: boolean

  /**
   * Tiempo restante en segundos
   */
  timeLeft: number
}

/**
 * Componente que muestra una taza de café con animación de vapor
 */
const CoffeeCup = ({ isActive, percentage, isWorking, timeLeft }: CoffeeCupProps) => {
  const cupRef = useRef<HTMLDivElement>(null)
  const initialCoffeeHeight = 130 // Altura máxima del café en px

  // Posición de fondo fija para la taza estática
  const backgroundPosition = "0 0%"

  // Formatea el tiempo restante en formato MM:SS
  const formattedTime = formatTime(timeLeft)

  return (
    <div className="flex items-center justify-center my-8">
      <div
        ref={cupRef}
        className="cup"
        style={{
          backgroundPosition: backgroundPosition,
          "--coffee-height": `${initialCoffeeHeight}px`
        } as React.CSSProperties}
      >
        {/* Mostrar vapor solo cuando está activo */}
        {isActive && (
          <>
            <span className="steam"></span>
            <span className="steam"></span>
            <span className="steam"></span>
          </>
        )}
        {/* Mostrar el contador dentro de la taza */}
        <div className="cup-timer">
          {formattedTime}
        </div>
        <div className="cup-handle"></div>
      </div>
    </div>
  )
}

export default CoffeeCup

