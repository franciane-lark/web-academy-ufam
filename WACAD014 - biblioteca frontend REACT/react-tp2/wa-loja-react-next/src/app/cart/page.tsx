'use client';

import { useQuery } from '@tanstack/react-query';
import { productsApi } from './services/api';

interface Product {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  fotos: { src: string; titulo: string }[];
  vendido: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await productsApi.get<Product[]>('/produto');
  return response.data;
};

export default function Home() {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <main className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container my-5">
        <div className="alert alert-danger" role="alert">
          Erro ao carregar os produtos: {(error as Error).message}
        </div>
      </main>
    );
  }

  return (
    <main className="container my-4">
      <h1 className="mb-4">Listagem de Produtos</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products?.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm">
              {product.fotos && product.fotos.length > 0 && (
                <img
                  src={product.fotos[0].src}
                  className="card-img-top"
                  alt={product.fotos[0].titulo || product.nome}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.nome}</h5>
                <p className="card-text text-muted">{product.descricao}</p>
                <p className="card-text fw-bold text-success">
                  R$ {Number(product.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}