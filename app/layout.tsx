
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SegaCore V1.0 - Construction Intelligence Platform',
  description: 'AI-powered construction project management and validation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-blue-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">SegaCore V1.0</h1>
            <div className="space-x-4">
              <a href="/" className="hover:text-blue-200">Home</a>
              <a href="/dashboard" className="hover:text-blue-200">Dashboard</a>
              <a href="/validation" className="hover:text-blue-200">Validation</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
