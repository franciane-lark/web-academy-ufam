'use client'

import { AuthProvider } from '@/context/Auth/AuthProvider'
import { FavoritesProvider } from '@/context/Favorites/FavoritesProvider'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}