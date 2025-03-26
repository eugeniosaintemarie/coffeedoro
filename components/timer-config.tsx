/**
 * Componente para la configuración del temporizador
 * 
 * Este componente permite al usuario configurar los tiempos de trabajo y descanso.
 */

"use client"

import { useEffect, useState } from "react"
import { validateTime } from "@/lib/timerUtils"

interface TimerConfigProps {
  /**
   * Tiempo de trabajo en minutos
   */
  workTime: number
  
  /**
   * Tiempo de descanso en minutos
   */
  breakTime: number
  
  /**
   * Función para actualizar el tiempo de trabajo
   */
  onWorkTimeChange: (time: number) => void
  
  /**
   * Función para actualizar el tiempo de descanso
   */
  onBreakTimeChange: (time: number) => void
  
  /**
   * Indica si el temporizador está activo o pausado
   */
  isActive: boolean
  
  /**
   * Función que se llama cuando cambian los valores de tiempo
   */
  onValuesChange?: () => void
}

/**
 * Componente que permite configurar los tiempos del temporizador
 */
const TimerConfig = ({
  workTime,
  breakTime,
  onWorkTimeChange,
  onBreakTimeChange,
  isActive,
  onValuesChange
}: TimerConfigProps) => {
  // Estados locales para los valores de los inputs
  const [localWorkTime, setLocalWorkTime] = useState(workTime)
  const [localBreakTime, setLocalBreakTime] = useState(breakTime)

  // Actualizar estados locales cuando cambian las props
  useEffect(() => {
    setLocalWorkTime(workTime)
    setLocalBreakTime(breakTime)
  }, [workTime, breakTime])

  /**
   * Maneja el cambio en el tiempo de trabajo
   */
  const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    const validatedValue = validateTime(value, 1, 60)
    setLocalWorkTime(validatedValue)
    onWorkTimeChange(validatedValue)
  }

  /**
   * Maneja el cambio en el tiempo de descanso
   */
  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    const validatedValue = validateTime(value, 1, 30)
    setLocalBreakTime(validatedValue)
    onBreakTimeChange(validatedValue)
  }

  // Efecto para detectar cambios en los valores y notificar al componente padre
  useEffect(() => {
    if (!isActive && onValuesChange) {
      onValuesChange()
    }
  }, [localWorkTime, localBreakTime, isActive, onValuesChange])

  return (
    <div className="flex gap-2">
      <input
        id="workTime"
        type="number"
        value={localWorkTime}
        onChange={handleWorkTimeChange}
        min="1"
        max="60"
        className="w-16 p-2 rounded text-center bg-[#212121] text-[#795548] focus:outline-none focus:ring-2 focus:ring-[#795548] appearance-none"
        disabled={isActive}
        aria-label="Minutos de trabajo"
        style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
      />

      <input
        id="breakTime"
        type="number"
        value={localBreakTime}
        onChange={handleBreakTimeChange}
        min="1"
        max="30"
        className="w-16 p-2 rounded text-center bg-[#212121] text-[#795548] focus:outline-none focus:ring-2 focus:ring-[#795548] appearance-none"
        disabled={isActive}
        aria-label="Minutos de descanso"
        style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
      />
    </div>
  )
}

export default TimerConfig