import type { FC } from "react"

interface CoffeeCupProps {
  percentage: number
  isWorking: boolean
  isActive: boolean
}

// Componente que muestra una taza de café con nivel según el porcentaje
const CoffeeCup: FC<CoffeeCupProps> = ({ percentage, isWorking, isActive }) => {
  // Calculamos la posición del fondo según el porcentaje
  const coffeeLevel = isWorking ? percentage : 100 - percentage
  const backgroundPosition = `0 ${130 - (coffeeLevel * 130 / 100)}px`
  
  return (
    <div className="flex items-center justify-center my-8">
      <div 
        className="cup"
        style={{
          backgroundPosition: backgroundPosition
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

