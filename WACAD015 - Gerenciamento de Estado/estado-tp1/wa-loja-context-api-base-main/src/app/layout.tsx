'use client'

import { FavoritesProvider } from '@/context/Favorites/FavoritesProvider'
import Navbar from '@/components/Navbar'
import BootstrapClient from '@/components/BootstrapClient'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <FavoritesProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </FavoritesProvider>
      </body>
    </html>
  )
}