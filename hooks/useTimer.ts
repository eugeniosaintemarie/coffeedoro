/**
 * Hook personalizado para manejar la lógica del temporizador Pomodoro
 * 
 * Este hook encapsula toda la lógica relacionada con el temporizador,
 * incluyendo el inicio, pausa, reinicio y cambio entre periodos de trabajo y descanso.
 */

import { useState, useEffect, useRef, useCallback } from "react"

interface TimerConfig {
  workTime: number
  breakTime: number
}

interface TimerState {
  timeLeft: number
  isWorking: boolean
  isActive: boolean
  percentage: number
  workTime: number  // Añadido para exponer el valor actual
  breakTime: number // Añadido para exponer el valor actual
}

interface TimerControls {
  startTimer: () => void
  resetTimer: () => void
  updateWorkTime: (time: number) => void
  updateBreakTime: (time: number) => void
}

/**
 * Hook personalizado para manejar la lógica del temporizador Pomodoro
 * 
 * @param initialWorkTime - Tiempo inicial de trabajo en minutos
 * @param initialBreakTime - Tiempo inicial de descanso en minutos
 * @returns Un objeto con el estado del temporizador y funciones para controlarlo
 */
export function useTimer(
  initialWorkTime: number = 25,
  initialBreakTime: number = 5
): [TimerState, TimerControls] {
  // Estado del temporizador
  const [workTime, setWorkTime] = useState(initialWorkTime)
  const [breakTime, setBreakTime] = useState(initialBreakTime)
  const [timeLeft, setTimeLeft] = useState(workTime * 60)
  const [isWorking, setIsWorking] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [percentage, setPercentage] = useState(100)

  // Referencia al intervalo del temporizador
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Reinicia el temporizador con los valores actuales
   */
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsActive(false)
    setIsWorking(true)
    setTimeLeft(workTime * 60)
    setPercentage(100)
  }, [workTime])

  /**
   * Inicia el temporizador
   */
  const startTimer = useCallback(() => {
    setIsActive(true)
  }, [])

  /**
   * Actualiza el tiempo de trabajo
   */
  const updateWorkTime = useCallback((time: number) => {
    setWorkTime(time)
    if (isWorking && !isActive) {
      setTimeLeft(time * 60)
    }
  }, [isWorking, isActive])

  /**
   * Actualiza el tiempo de descanso
   */
  const updateBreakTime = useCallback((time: number) => {
    setBreakTime(time)
    if (!isWorking && !isActive) {
      setTimeLeft(time * 60)
    }
  }, [isWorking, isActive])

  // Efecto para manejar el temporizador cuando está activo
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout)

            if (isWorking) {
              // Periodo de trabajo terminado
              const confirmed = window.confirm("¡Tiempo de trabajo completado! Es hora de tomar un descanso.")
              if (confirmed) {
                setIsWorking(false)
                setTimeLeft(breakTime * 60)
                setIsActive(true)
                return breakTime * 60
              } else {
                setIsActive(false)
                return 0
              }
            } else {
              // Periodo de descanso terminado
              window.confirm("¡Descanso terminado! Es hora de volver al trabajo.")
              setIsWorking(true)
              setTimeLeft(workTime * 60)
              setIsActive(false)
              return workTime * 60
            }
          }
          return prev - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, isWorking, workTime, breakTime])

  // Devuelve el estado y los controles del temporizador
  return [
    { timeLeft, isWorking, isActive, percentage, workTime, breakTime },
    { startTimer, resetTimer, updateWorkTime, updateBreakTime }
  ]
}