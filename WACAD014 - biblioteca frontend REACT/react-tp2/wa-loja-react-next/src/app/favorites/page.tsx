'use client';

import { useQuery } from '@tanstack/react-query';
import { favoriteApi } from '../services/api';
import { FavoriteList, Produto } from '../components/FavoriteList';

const fetchFavorites = async (): Promise<Produto[]> => {
  const response = await favoriteApi.get<Produto[]>('/favorites');
  return response.data;
};

export default function FavoritesPage() {
  const { data: favorites, isLoading, isError, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  });

  if (isLoading) {
    return (
      <main className="container my-5 text-center">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Carregando produtos favoritos...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container my-5">
        <div className="alert alert-danger" role="alert">
          Ocorreu um erro ao carregar os produtos favoritos: {(error as Error).message}
        </div>
      </main>
    );
  }

  return (
    <main className="container my-4">
      <div className="card p-4 border shadow-sm">
        <h5 className="card-title fw-semibold mb-4">Produtos Favoritos</h5>

        {!favorites || favorites.length === 0 ? (
          <p className="text-muted my-3">Nenhum produto adicionado aos favoritos.</p>
        ) : (
          <FavoriteList favorites={favorites} />
        )}
      </div>
    </main>
  );
}