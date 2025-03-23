"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import CoffeeCup from "@/components/coffee-cup"
import TimeInputs from "@/components/time-inputs"
import { Play, RotateCcw } from "lucide-react"
import CupAnimation from './cupAnimation.js';


export default function Home() {
  const [workTime, setWorkTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [timeLeft, setTimeLeft] = useState(workTime * 60)
  const [isWorking, setIsWorking] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [percentage, setPercentage] = useState(100)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const cupAnimationRef = useRef<CupAnimation | null>(null)

  // Función para reiniciar el temporizador con los valores actuales
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsActive(false)
    setIsWorking(true)
    setTimeLeft(workTime * 60)
    setPercentage(100)
    
    // Detener y reiniciar la animación de la taza
    if (cupAnimationRef.current) {
      cupAnimationRef.current.stop()
    }
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
                
                // Cambiar a modo descanso en la animación
                if (cupAnimationRef.current) {
                  cupAnimationRef.current.stop()
                  cupAnimationRef.current.refill(breakTime * 60)
                }
                
                return breakTime * 60
              } else {
                setIsActive(false)
                
                // Detener la animación
                if (cupAnimationRef.current) {
                  cupAnimationRef.current.stop()
                }
                
                return 0
              }
            } else {
              // Break period ended
              window.confirm("¡Descanso terminado! Es hora de volver al trabajo.")
              setIsWorking(true)
              setTimeLeft(workTime * 60)
              setIsActive(false)
              
              // Detener la animación
              if (cupAnimationRef.current) {
                cupAnimationRef.current.stop()
              }
              
              return workTime * 60
            }
          }
          return prev - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
      
      // Detener la animación cuando se detiene el temporizador
      if (cupAnimationRef.current) {
        cupAnimationRef.current.pause()
      }
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
  
  // Inicializar la animación de la taza cuando el componente se monte
  useEffect(() => {
    // Esperamos a que el DOM esté listo para inicializar la animación
    if (typeof window !== 'undefined') {
      // Inicializamos la animación cuando el componente se monta
      setTimeout(() => {
        cupAnimationRef.current = new CupAnimation('.cup', workTime * 60)
        
        // Aseguramos que la taza esté llena al inicio
        if (cupAnimationRef.current) {
          cupAnimationRef.current.setCoffeeHeight(130);
        }
      }, 500) // Pequeño retraso para asegurar que el DOM está listo
    }
    
    return () => {
      // Limpiamos la animación cuando el componente se desmonta
      if (cupAnimationRef.current) {
        cupAnimationRef.current.stop()
      }
    }
  }, [workTime]) // Actualizamos cuando cambia el tiempo de trabajo

  const handleButtonClick = () => {
    if (isActive) {
      // Si está activo, reiniciar
      resetTimer()
      // Detener la animación de la taza
      if (cupAnimationRef.current) {
        cupAnimationRef.current.stop()
      }
    } else {
      // Si no está activo, iniciar
      setIsActive(true)
      
      // Iniciar la animación de la taza
      if (cupAnimationRef.current) {
        // Configurar la duración correcta según el modo actual
        const duration = isWorking ? workTime * 60 : breakTime * 60
        cupAnimationRef.current.setPomodoroDuration(duration)
        
        if (isWorking) {
          cupAnimationRef.current.start() // Iniciar vaciado en modo trabajo
        } else {
          cupAnimationRef.current.refill(breakTime * 60) // Iniciar llenado en modo descanso
        }
      }
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

