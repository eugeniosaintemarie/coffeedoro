"use client"

import { useRef, useState, useEffect } from "react"

interface CoffeeCupProps {
  percentage: number
  isWorking: boolean
  isActive: boolean
}

const CoffeeCup = ({ percentage, isWorking, isActive }: CoffeeCupProps) => {
  const cupRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const [coffeeHeight, setCoffeeHeight] = useState(130) // Altura inicial en px

  // Calcular la posición de fondo basada en la altura del café
  const backgroundPosition = `0 ${100 - (coffeeHeight / 150) * 100}%`
  
  // Función para animar el café usando requestAnimationFrame
  const animateCoffee = (timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp
    }

    const elapsed = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp

    // Calcular la altura objetivo basada en el porcentaje
    const targetHeight = (percentage / 100) * 130 // 130px es la altura máxima del café
    
    // Animación suave hacia el valor objetivo
    if (Math.abs(coffeeHeight - targetHeight) > 0.5) {
      // Velocidad de animación ajustable
      const speed = isWorking ? 0.1 : 0.05 // Más rápido al vaciar, más lento al llenar
      const step = elapsed * speed
      
      setCoffeeHeight(prev => {
        if (prev > targetHeight) {
          return Math.max(targetHeight, prev - step)
        } else {
          return Math.min(targetHeight, prev + step)
        }
      })
    }

    animationRef.current = requestAnimationFrame(animateCoffee)
  }

  // Iniciar/detener animación basado en isActive
  useEffect(() => {
    if (isActive) {
      animationRef.current = requestAnimationFrame(animateCoffee)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, percentage])

  // Actualizar la variable CSS cuando cambia la altura del café
  useEffect(() => {
    if (cupRef.current) {
      cupRef.current.style.setProperty("--coffee-height", `${coffeeHeight}px`)
    }
  }, [coffeeHeight])

  return (
    <div className="flex items-center justify-center my-8">
      <div
        ref={cupRef}
        className="cup"
        style={{
          backgroundPosition: backgroundPosition,
          // No es necesario establecer --coffee-height aquí ya que lo hacemos en el useEffect
        }}
      >
        {/* Mostrar vapor solo cuando está activo y el café está caliente (por encima del 70%) */}
        {isActive && percentage > 70 && (
          <>
            <span className="steam"></span>
            <span className="steam"></span>
            <span className="steam"></span>
          </>
        )}
        <div className="cup-handle"></div>
      </div>
    </div>
  )
}

export default CoffeeCup

