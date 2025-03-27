import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PWARegister } from "./pwa"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coffeedoro",
  description: "A pomodoro coffee-style timer",
  manifest: "/manifest.json",
  themeColor: "#000000",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", sizes: "48x48 72x72 96x96", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/icon-192x192.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Coffeedoro",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  applicationName: "Coffeedoro",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Coffeedoro",
    title: "Coffeedoro",
    description: "A pomodoro coffee-style timer",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.svg"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Coffee Pomodoro" />
        <link rel="mask-icon" href="/icons/icon-512x512.png" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={null}>
            <PWARegister />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'