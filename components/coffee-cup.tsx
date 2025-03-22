import type { FC } from "react"

interface CoffeeCupProps {
  percentage: number
  isWorking: boolean
}

const CoffeeCup: FC<CoffeeCupProps> = ({ percentage, isWorking }) => {
  // Calcular la altura del líquido basado en el porcentaje
  const liquidHeight = `${percentage}%`

  return (
    <div className="relative flex items-center justify-center my-8">
      <div className="cup relative w-[220px] h-[180px] border-[8px] border-[#CFD8DC] shadow-cup rounded-[10px_10px_60px_75px] overflow-hidden">
        {/* Steam elements */}
        <span className="steam"></span>
        <span className="steam"></span>
        <span className="steam"></span>

        {/* Cup handle */}
        <div className="cup-handle"></div>

        {/* Coffee liquid */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#795548] transition-all duration-1000 ease-linear"
          style={{ 
            height: liquidHeight,
            backgroundImage: isWorking ? 'url("/coffee-pattern.png")' : 'none',
            backgroundRepeat: 'repeat-x',
            animation: isWorking ? 'filling 4s infinite' : 'none'
          }}
        ></div>
      </div>
    </div>
  )
}

export default CoffeeCup

