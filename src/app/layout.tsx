import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import { AlertProvider } from './contexts/AlertContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Memora',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`flex items-center justify-center h-screen ${poppins.variable} antialiased bg-theme-600`}
      >
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  )
}
