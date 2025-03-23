"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import CoffeeCup from "@/components/coffee-cup"
import TimeInputs from "@/components/time-inputs"
import { Play, RotateCcw } from "lucide-react"


export default function Home() {
  const [workTime, setWorkTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [timeLeft, setTimeLeft] = useState(workTime * 60)
  const [isWorking, setIsWorking] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [percentage, setPercentage] = useState(100)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Función para reiniciar el temporizador con los valores actuales
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsActive(false)
    setIsWorking(true)
    setTimeLeft(workTime * 60)
    setPercentage(100)
  }, [workTime])

  // Función para manejar cambios en los inputs
  const handleInputChange = useCallback(() => {
    resetTimer()
  }, [resetTimer])

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout)

            if (isWorking) {
              // Work period ended
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
              // Break period ended
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
      
      // Limpiar la animación cuando el efecto se desmonta
      if (cupAnimationRef.current) {
        cupAnimationRef.current.stop()
      }
    }
  }, [isActive, isWorking, workTime, breakTime])

  useEffect(() => {
    if (isWorking) {
      const totalTime = workTime * 60
      setPercentage(Math.min(100, Math.max(0, (timeLeft / totalTime) * 100)))
    } else {
      const totalTime = breakTime * 60
      setPercentage(Math.min(100, Math.max(0, 100 - (timeLeft / totalTime) * 100)))
    }
  }, [timeLeft, workTime, breakTime, isWorking])
  
  // La animación de la taza ahora se maneja directamente en el componente CoffeeCup

  const handleButtonClick = () => {
    if (isActive) {
      // Si está activo, reiniciar
      resetTimer()
    } else {
      // Si no está activo, iniciar
      setIsActive(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <CoffeeCup percentage={percentage} isWorking={isWorking} isActive={isActive} />

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleButtonClick}
            className="p-3 bg-[#212121] text-[#795548] rounded-full hover:bg-[#2c2c2c] transition-colors"
            aria-label={isActive ? "Reiniciar" : "Iniciar"}
          >
            {isActive ? <RotateCcw size={24} /> : <Play size={24} />}
          </button>

          <TimeInputs
            workTime={workTime}
            breakTime={breakTime}
            setWorkTime={setWorkTime}
            setBreakTime={setBreakTime}
            isActive={isActive}
            onValuesChange={handleInputChange}
          />
        </div>
      </div>
    </main>
  )
}

