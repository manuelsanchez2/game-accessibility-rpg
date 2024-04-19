import type { Metadata } from 'next'
import { Inter, Press_Start_2P } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const pressStart2P = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-pressStart2P',
})

export const metadata: Metadata = {
  title: 'Game Accessibility Template',
  description:
    'Opinionated template for creating top down more accessible games with Nextjs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-inter bg-gray-900 text-white text-sm ${inter.variable} ${pressStart2P.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
