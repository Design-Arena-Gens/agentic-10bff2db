import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '15-Min Dumbbell Workout',
  description: 'Full body workout with 5kg dumbbells',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
