"use client"

import type React from "react"
import { useEffect } from "react"
import type { FC } from "react"

interface TimeInputsProps {
  workTime: number
  breakTime: number
  setWorkTime: (time: number) => void
  setBreakTime: (time: number) => void
  isActive: boolean
  onValuesChange: () => void
}

const TimeInputs: FC<TimeInputsProps> = ({
  workTime,
  breakTime,
  setWorkTime,
  setBreakTime,
  isActive,
  onValuesChange,
}) => {
  const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setWorkTime(value)
    }
  }

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setBreakTime(value)
    }
  }

  // Efecto para detectar cambios en los valores y notificar al componente padre
  useEffect(() => {
    if (!isActive) {
      onValuesChange()
    }
  }, [workTime, breakTime, isActive, onValuesChange])

  return (
    <div className="flex gap-2">
      <input
        id="workTime"
        type="number"
        value={workTime}
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
        value={breakTime}
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

export default TimeInputs

