import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './_components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '不揪 Food Date',
  description: 'A food date app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> 
        <div className="mt-16 overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
