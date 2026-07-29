'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { Product } from '../../components/ProductCard';

const fetchProductDetails = async (productName: string): Promise<Product> => {
  const response = await productsApi.get<Product>(`/produto/${productName}`);
  return response.data;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productName = params.product as string;

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', productName],
    queryFn: () => fetchProductDetails(productName),
    enabled: !!productName,
  });

  if (isLoading) {
    return (
      <main className="container my-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Carregando detalhes...</span>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="container my-5">
        <div className="alert alert-danger">
          Erro ao carregar o produto: {(error as Error)?.message || 'Produto não encontrado'}
        </div>
      </main>
    );
  }

  return (
    <main className="container my-4">
      <div className="card p-4 border shadow-sm">
        <p className="text-muted mb-1">Detalhes do produto</p>
        <h3 className="fw-bold mb-4">{product.nome}</h3>

        <div className="d-flex gap-3 mb-4 flex-wrap">
          {product.fotos?.map((foto, index) => (
            <img
              key={index}
              src={foto.src}
              alt={foto.titulo || product.nome}
              style={{ width: '250px', height: '250px', objectFit: 'cover' }}
              className="rounded border"
            />
          ))}
        </div>

        <p className="fw-bold mb-2">Valor: R${product.preco}</p>
        <p className="mb-2">
          <strong>Descrição:</strong> {product.descricao}
        </p>
        <p className="text-muted mb-0">
          <strong>Anunciado por:</strong> {product.usuario_id || 'maria@origamid.com'}
        </p>
      </div>
    </main>
  );
}