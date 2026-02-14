import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EV Cost to Drive Calculator | See How Much You Could Save',
  description: 'Compare monthly EV electricity costs vs. gas costs and see how much you could save driving electric.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
