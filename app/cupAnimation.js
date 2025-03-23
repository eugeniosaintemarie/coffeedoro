// cupAnimation.js

/**
 * Manages the coffee cup animation for the Pomodoro timer.
 */
class CupAnimation {
  constructor(cupSelector = '.cup', pomodoroDuration = 1500) {
    this.cupElement = document.querySelector(cupSelector);
    if (!this.cupElement) {
      console.error(`Cup element with selector "${cupSelector}" not found.`);
      return;
    }
    this.initialCoffeeHeight = 130; // px (from globals.css)
    this.pomodoroDuration = pomodoroDuration; // seconds (25 minutes by default)
    this.reductionRate = this.initialCoffeeHeight / this.pomodoroDuration; // px/second
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.isPaused = false;
    this.isStarted = false;
  }

  /**
   * Updates the coffee level in the cup based on elapsed time.
   */
  updateCoffeeLevel() {
    if (!this.isStarted || this.isPaused) return;

    this.elapsedSeconds++;
    const newHeight = this.initialCoffeeHeight - (this.elapsedSeconds * this.reductionRate);
    this.setCoffeeHeight(Math.max(0, newHeight));

    if (this.elapsedSeconds >= this.pomodoroDuration) {
      this.stop();
      // You might want to trigger an event here to notify that the Pomodoro has ended.
      console.log("Pomodoro finished!");
      // Example of a custom event:
      const pomodoroEndEvent = new CustomEvent('pomodoroEnd');
      document.dispatchEvent(pomodoroEndEvent);
    }
  }

  /**
   * Sets the coffee height in the cup.
   * @param {number} height - The new height of the coffee level in pixels.
   */
  setCoffeeHeight(height) {
    if (this.cupElement) {
      // No podemos seleccionar directamente un pseudo-elemento con querySelector
      // Usamos la variable CSS para controlar la altura
      this.cupElement.style.setProperty('--coffee-height', `${height}px`);
      
      // También actualizamos la posición del fondo para mantener consistencia visual
      this.cupElement.style.backgroundPosition = `0 ${height}px`;
      
      // Forzamos un reflow para asegurar que los cambios se apliquen inmediatamente
      this.cupElement.offsetHeight;
    }
  }

  /**
   * Starts the coffee cup animation.
   */
  start() {
    if (this.isStarted) return;
    this.isStarted = true;
    this.isPaused = false;
    this.timerInterval = setInterval(() => this.updateCoffeeLevel(), 1000); // Update every second
  }

  /**
   * Pauses the coffee cup animation.
   */
  pause() {
    if (!this.isStarted || this.isPaused) return;
    this.isPaused = true;
    clearInterval(this.timerInterval);
  }

  /**
   * Resumes the coffee cup animation.
   */
  resume() {
    if (!this.isStarted || !this.isPaused) return;
    this.isPaused = false;
    this.timerInterval = setInterval(() => this.updateCoffeeLevel(), 1000); // Update every second
  }

  /**
   * Stops the coffee cup animation and resets it.
   */
  stop() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.isPaused = false;
    this.isStarted = false;
    this.setCoffeeHeight(this.initialCoffeeHeight);
  }

  /**
   * Resets the coffee cup animation.
   */
  reset() {
    this.stop();
  }

  /**
   * Sets the duration of the pomodoro.
   * @param {number} duration - The duration of the pomodoro in seconds.
   */
  setPomodoroDuration(duration) {
    this.pomodoroDuration = duration;
    this.reductionRate = this.initialCoffeeHeight / this.pomodoroDuration;
  }

  /**
   * Refills the coffee cup during the break.
   * @param {number} breakDuration - The duration of the break in seconds.
   */
  refill(breakDuration) {
    const refillRate = this.initialCoffeeHeight / breakDuration;
    let refillSeconds = 0;
    const refillInterval = setInterval(() => {
      refillSeconds++;
      const newHeight = (refillSeconds * refillRate);
      this.setCoffeeHeight(Math.min(this.initialCoffeeHeight, newHeight));

      if (refillSeconds >= breakDuration) {
        clearInterval(refillInterval);
        console.log("Break finished, coffee refilled!");
        // Example of a custom event:
        const breakEndEvent = new CustomEvent('breakEnd');
        document.dispatchEvent(breakEndEvent);
      }
    }, 1000); // Update every second
  }
}

export default CupAnimation;
