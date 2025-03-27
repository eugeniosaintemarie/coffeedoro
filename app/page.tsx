"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function PomodoroTimer() {
  // Timer states
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [workTime, setWorkTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [showBreakDialog, setShowBreakDialog] = useState(false)
  const [showCompletedDialog, setShowCompletedDialog] = useState(false)
  const [fillLevel, setFillLevel] = useState(100) // Coffee fill level (100% = full)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Check notification permission on mount
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission)

      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission)
        })
      }
    }
  }, [])

  // Listen for the beforeinstallprompt event to enable install button
  useEffect(() => {
    const [hasShownInstallPrompt, setHasShownInstallPrompt] = useState(false)

const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to notify the user they can install the PWA
      setIsInstallable(true)

      // Show install prompt only if it hasn't been shown before
      if (!hasShownInstallPrompt) {
        setHasShownInstallPrompt(true)
        installPWA()
      }
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  // Handle timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout)

            if (isBreak) {
              // Break completed - show notification and dialog
              showNotification("¡Cycle completed!", "")
              setShowCompletedDialog(true)
              setIsRunning(false)
              setIsBreak(false)
              setFillLevel(100) // Reset to full cup
              return workTime * 60
            } else {
              // Work completed - show notification and dialog, empty cup completely
              setFillLevel(0) // Empty the cup completely
              showNotification("¡Break moment!", "")
              setShowBreakDialog(true)
              setIsRunning(false)
              return breakTime * 60
            }
          }
          return prev - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning, isBreak, workTime, breakTime])

  // Update fill level based on time remaining
  useEffect(() => {
    if (isRunning) {
      if (isBreak) {
        // During break, cup fills up
        const totalBreakTime = breakTime * 60
        const percentComplete = (totalBreakTime - timeLeft) / totalBreakTime
        setFillLevel(Math.max(0, Math.min(100, percentComplete * 100)))
      } else {
        // During work, cup empties
        const totalWorkTime = workTime * 60
        const percentRemaining = timeLeft / totalWorkTime
        setFillLevel(Math.max(0, Math.min(100, percentRemaining * 100)))
      }
    }
  }, [timeLeft, isRunning, isBreak, workTime, breakTime])

  // Show browser notification
  const showNotification = (title: string, body: string) => {
    if ("Notification" in window && notificationPermission === "granted") {
      // Create and show notification
      const notification = new Notification(title, {
        body: body,
        icon: "/icons/icon-192x192.png",
      })

      // Focus window when notification is clicked
      notification.onclick = () => {
        window.focus()
        notification.close()
      }
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Start break timer
  const startBreak = () => {
    setIsBreak(true)
    setTimeLeft(breakTime * 60)
    setIsRunning(true)
    setShowBreakDialog(false)
  }

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(workTime * 60)
    setFillLevel(100)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Toggle timer (start or reset)
  const toggleTimer = () => {
    if (isRunning) {
      resetTimer()
    } else {
      if (!isBreak && timeLeft === 0) {
        // If work timer ended, start break
        startBreak()
      } else if (isBreak && timeLeft === 0) {
        // If break timer ended, start new work session
        setIsBreak(false)
        setTimeLeft(workTime * 60)
        setFillLevel(100)
        setIsRunning(true)
      } else {
        // Normal start
        setIsRunning(true)
      }
    }
  }

  // Handle work time input change
  const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setWorkTime(value)
      if (!isRunning && !isBreak) {
        setTimeLeft(value * 60)
      }
    }
  }

  // Handle break time input change
  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setBreakTime(value)
    }
  }

  // Handle PWA installation
  const installPWA = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice

      // We no longer need the prompt. Clear it up
      setDeferredPrompt(null)

      // Hide the install button
      setIsInstallable(false)

      console.log(`User response to the install prompt: ${outcome}`)
    }
  }

  // Request notification permission
  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission)
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      {notificationPermission !== "granted" && (
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <div className="bg-yellow-800 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span>Allow notifications</span>
            <Button
              onClick={requestNotificationPermission}
              variant="outline"
              className="text-xs h-8 bg-yellow-700 hover:bg-yellow-600 border-none"
            >
              Allow
            </Button>
          </div>
        </div>
      )}

      {isInstallable && (
        <div className="absolute top-4 right-4">
          <Button onClick={installPWA} variant="outline" className="text-sm bg-blue-700 hover:bg-blue-600 border-none">
            Instalar App
          </Button>
        </div>
      )}

      <div className="cup-container relative mb-12">
        <div className="cup">
          <div className="coffee-container">
            <div className="coffee" style={{ height: `${fillLevel}%` }}></div>
          </div>
          <div className="timer-display">{formatTime(timeLeft)}</div>
        </div>
        {}
        <div className="cup-handle"></div>
      </div>

      <div className="flex flex-row items-center gap-6">
        <Button
          onClick={toggleTimer}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          variant="outline"
          aria-label={isRunning ? "Reset timer" : "Start timer"}
        >
          {isRunning ? <RotateCcw size={20} /> : <Play size={20} />}
        </Button>

        <Input
          type="number"
          min="1"
          value={workTime}
          onChange={handleWorkTimeChange}
          className="w-20 text-center custom-number-input"
          disabled={isRunning}
          aria-label="Work minutes"
        />

        <Input
          type="number"
          min="1"
          value={breakTime}
          onChange={handleBreakTimeChange}
          className="w-20 text-center custom-number-input"
          disabled={isRunning}
          aria-label="Break minutes"
        />
      </div>

      
      <Dialog open={showBreakDialog} onOpenChange={setShowBreakDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Break moment!</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={startBreak}>Start</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <Dialog open={showCompletedDialog} onOpenChange={setShowCompletedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Cycle completed!</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowCompletedDialog(false)}>Restart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <footer className="footer">
        <a href="https://eugeniosaintemarie.github.io/" target="_blank" rel="noopener noreferrer">
          ∃ugenio © {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  )
}

