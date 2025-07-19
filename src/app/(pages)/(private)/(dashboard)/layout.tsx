import { Poppins } from 'next/font/google'

import '../../../globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section
      className={`flex items-center justify-center h-screen w-full antialiased bg-theme-600 ${poppins.variable}`}
    >
      {children}
    </section>
  )
}
