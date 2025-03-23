import type { FC } from "react"

interface CoffeeCupProps {
  percentage: number
  isWorking: boolean
  isActive: boolean
}

// Componente que muestra una taza de café con nivel según el porcentaje
const CoffeeCup: FC<CoffeeCupProps> = ({ percentage, isWorking, isActive }) => {
  // Calculamos la posición del fondo según el porcentaje
  // En modo trabajo, el café debe disminuir (100% al inicio, 0% al final)
  // En modo descanso, el café debe aumentar (0% al inicio, 100% al final)
  const coffeeLevel = isWorking ? percentage : 100 - percentage
  // Invertimos la lógica para que el café se vacíe visualmente (130px es vacío, 0px es lleno)
  const backgroundPosition = `0 ${(coffeeLevel * 130 / 100)}px`
  
  return (
    <div className="flex items-center justify-center my-8">
      <div 
        className="cup"
        style={{
          backgroundPosition: backgroundPosition,
          transition: "background-position 0.5s ease-in-out"
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

