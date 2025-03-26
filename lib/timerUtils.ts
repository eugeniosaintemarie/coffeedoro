/**
 * Utilidades para el manejo del temporizador
 * 
 * Este archivo contiene funciones auxiliares para el manejo del temporizador,
 * como el formateo de tiempo y cálculos relacionados.
 */

/**
 * Formatea el tiempo en segundos a formato MM:SS
 * 
 * @param seconds - Tiempo en segundos
 * @returns Tiempo formateado en formato MM:SS
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Calcula el porcentaje de tiempo restante
 * 
 * @param timeLeft - Tiempo restante en segundos
 * @param totalTime - Tiempo total en segundos
 * @returns Porcentaje de tiempo restante (0-100)
 */
export function calculatePercentage(timeLeft: number, totalTime: number): number {
  if (totalTime <= 0) return 100;
  const percentage = (timeLeft / totalTime) * 100;
  return Math.max(0, Math.min(100, percentage));
}

/**
 * Valida el tiempo de entrada
 * 
 * @param time - Tiempo a validar
 * @param min - Valor mínimo permitido
 * @param max - Valor máximo permitido
 * @returns Tiempo validado dentro del rango permitido
 */
export function validateTime(time: number, min: number = 1, max: number = 60): number {
  if (isNaN(time) || time < min) return min;
  if (time > max) return max;
  return time;
}