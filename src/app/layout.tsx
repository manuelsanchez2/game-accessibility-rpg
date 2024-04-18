import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SettingsModal from '@/components/modals/settings-modal'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
