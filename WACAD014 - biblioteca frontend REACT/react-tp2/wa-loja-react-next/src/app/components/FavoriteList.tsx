'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { favoriteApi } from '../services/api';

export interface Foto {
  src: string;
  titulo: string;
}

export interface Produto {
  id: string;
  fotos: Foto[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id?: string;
}

interface FavoriteListProps {
  favorites: Produto[];
}

const deleteFavorite = async (id: string) => {
  await favoriteApi.delete(`/favorites/${id}`);
};

export function FavoriteList({ favorites }: FavoriteListProps) {
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      toast.info('Produto removido dos favoritos!');
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (error: Error) => {
      toast.error(`Erro ao remover favorito: ${error.message}`);
    },
  });

  return (
    <div className="table-responsive">
      <table className="table table-borderless align-middle">
        <thead>
          <tr className="border-bottom">
            <th scope="col" className="fw-semibold">Produto</th>
            <th scope="col" className="fw-semibold">Valor</th>
            <th scope="col" className="fw-semibold">Opções</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((product) => (
            <tr key={product.id} className="border-bottom">
              <td className="py-3">{product.nome}</td>
              <td className="py-3">R$ {product.preco}</td>
              <td className="py-3">
                <button
                  onClick={() => removeMutation.mutate(product.id)}
                  disabled={removeMutation.isPending}
                  className="btn btn-danger btn-sm px-3"
                >
                  {removeMutation.isPending ? 'Removendo...' : 'Remover'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}