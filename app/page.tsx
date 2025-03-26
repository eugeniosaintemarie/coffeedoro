/**
 * Página principal de la aplicación
 * 
 * Esta página muestra el temporizador Pomodoro utilizando el componente principal
 * que integra todos los componentes modulares.
 */

"use client"

import PomodoroTimer from "@/components/pomodoro-timer"

/**
 * Componente de la página principal
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <PomodoroTimer initialWorkTime={25} initialBreakTime={5} />
    </main>
  )
}

