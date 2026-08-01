'use client'

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface FavoritesContextType {
  favorites: any[]
  setFavorites: Dispatch<SetStateAction<any[]>>
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => ({})
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<any[]>([])

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}