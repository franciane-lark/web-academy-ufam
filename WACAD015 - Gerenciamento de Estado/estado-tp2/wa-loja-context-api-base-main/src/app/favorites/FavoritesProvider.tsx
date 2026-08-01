'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  id: string | number
  name: string
  price: number
  [key: string]: any
}

interface FavoritesContextData {
  favorites: Product[]'use client'

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
  checkIsFavorite: (id: string | number) => boolean
  addFavorite: (product: Product) => void
  removeFavorite: (id: string | number) => void
  totalFavoritesValue: number
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  const checkIsFavorite = (id: string | number) => {
    return favorites.some((item) => item.id === id)
  }

  const removeFavorite = (id: string | number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  const addFavorite = (product: Product) => {
    setFavorites((prev) => [...prev, product])
  }

  const totalFavoritesValue = favorites.reduce((acc, item) => acc + item.price, 0)

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        checkIsFavorite,
        addFavorite,
        removeFavorite,
        totalFavoritesValue
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavoritesContext deve ser usado dentro de um FavoritesProvider')
  }
  return context
}

/*
'use client'

import { useFavoritesContext } from '@/context/Favorites/FavoritesProvider'

export default function ProductCard({ product }: { product: any }) {
  const { checkIsFavorite, addFavorite, removeFavorite } = useFavoritesContext()
  const isFav = checkIsFavorite(product.id)

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  return (
    <div className="card p-3">
      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>
      <button 
        className={`btn ${isFav ? 'btn-success' : 'btn-secondary'}`} 
        onClick={handleToggleFavorite}
      >
        {isFav ? 'Favoritado' : 'Favoritar'}
      </button>
    </div>
  )
}
*/