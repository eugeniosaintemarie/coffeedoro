"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Componente interno que usa useSearchParams
function PWAContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle PWA shortcuts
    const action = searchParams?.get("action")
    if (action === "start") {
      // Dispatch a custom event that the main component can listen for
      window.dispatchEvent(new CustomEvent("pwa-start-timer"))
    }
  }, [searchParams])

  return null
}

export function PWARegister() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("Service Worker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  // Solo renderizar el componente que usa useSearchParams cuando estamos en el cliente
  if (!isMounted) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <PWAContent />
    </Suspense>
  )
}

