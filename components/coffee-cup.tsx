import type { FC } from "react"

interface CoffeeCupProps {
  percentage: number
  isWorking: boolean
}

// Componente simplificado que sigue el diseño original
const CoffeeCup: FC<CoffeeCupProps> = () => {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="cup">
        <span className="steam"></span>
        <span className="steam"></span>
        <span className="steam"></span>
        <div className="cup-handle"></div>
      </div>
    </div>
  )
}

export default CoffeeCup

