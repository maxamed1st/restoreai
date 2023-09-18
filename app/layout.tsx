import './globals.css'

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
          {children}
      </body>
    </html>
  )
}
