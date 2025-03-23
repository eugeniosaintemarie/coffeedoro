"use client"

import { useRef, useState, useEffect } from "react"

const CoffeeCup = () => {
  const [coffeeHeight, setCoffeeHeight] = useState(50)
  const [isActive, setIsActive] = useState(true)
  const cupRef = useRef<HTMLDivElement>(null)

  const backgroundPosition = `0 ${100 - (coffeeHeight / 150) * 100}%`

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
        {isActive && (
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

