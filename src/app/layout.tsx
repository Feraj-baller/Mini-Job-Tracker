import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Job Application',
  description: 'Applying for jobs in the tech world!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
