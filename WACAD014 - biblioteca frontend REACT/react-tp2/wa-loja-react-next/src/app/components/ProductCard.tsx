'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { favoriteApi } from '../services/api';

export interface Product {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  fotos: { src: string; titulo: string }[];
  vendido: string;
}

interface ProductCardProps {
  product: Product;
}

const addFavorite = async (product: Product) => {
  const response = await favoriteApi.post('/favorites', product);
  return response.data;
};

export function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      toast.success(`"${product.nome}" adicionado aos favoritos!`);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (error: Error) => {
      toast.error(`Erro ao favoritar: ${error.message}`);
    },
  });

  return (
    <div className="card h-100 border-0 shadow-sm bg-light">
      {product.fotos && product.fotos.length > 0 && (
        <img
          src={product.fotos[0].src}
          className="card-img-top"
          alt={product.fotos[0].titulo || product.nome}
          style={{ height: '240px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column justify-content-between p-3">
        <div>
          <h5 className="card-title fw-semibold mb-1" style={{ fontSize: '1rem' }}>
            {product.nome}
          </h5>
          <p className="card-text text-muted mb-3" style={{ fontSize: '0.875rem' }}>
            R$ {product.preco}
          </p>
        </div>

        <div className="d-flex flex-column gap-2 mt-auto">
  
          <button className="btn btn-dark w-100 btn-sm py-2 fw-medium">
            Adicionar no carrinho
          </button>

        
          <button
            onClick={() => favoriteMutation.mutate(product)}
            disabled={favoriteMutation.isPending}
            className="btn btn-secondary bg-opacity-10 text-dark border-0 w-100 btn-sm py-2 fw-medium"
            style={{ backgroundColor: '#e2e8f0' }}
          >
            {favoriteMutation.isPending ? 'Favoritando...' : 'Favoritar'}
          </button>
        </div>
      </div>
    </div>
  );
}