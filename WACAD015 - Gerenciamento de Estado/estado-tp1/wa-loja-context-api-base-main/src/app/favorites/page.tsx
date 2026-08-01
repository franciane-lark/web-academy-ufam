'use client'

import { useContext } from 'react'
import { FavoritesContext } from '@/context/Favorites/FavoritesProvider'

export default function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext)

  return (
    <main className="container p-5">
      <h1>Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Nenhum produto favoritado ainda.</p>
      ) : (
        <div className="product-grid">
          {favorites.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}