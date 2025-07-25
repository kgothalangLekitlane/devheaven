import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/components/theme-provider'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'DevHeaven - Connect with Developers Worldwide',
  description: 'Join the global community of developers. Share projects, find jobs, connect with peers.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
