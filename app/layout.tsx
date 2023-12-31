import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs';

import { ThemeProvider } from '@/providers/theme-provider';
import ToastProvider from '@/providers/toast-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'codeVeegan',
  description: 'codeVeegan portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToastProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
