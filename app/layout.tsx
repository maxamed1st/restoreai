import './globals.css'
import AuthProvider from './context/AuthProvider'
import Navbar from '@/app/components/Navbar'

export const metadata = {
  title: 'Restore AI',
  description: 'Restore, enhance and colorize old photography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background flex flex-col items-center">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
