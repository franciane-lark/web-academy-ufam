import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { useFavoritesContext } from "../../hooks/useFavoritesContext";

// 1. Mock do Hook de Contexto
jest.mock("../../hooks/useFavoritesContext", () => ({
  useFavoritesContext: jest.fn(),
}));

// 2. Mock do componente filho (opcional, mas boa prática para teste unitário)
jest.mock("../ProductCard/ProductCard", () => {
  return function MockProductCard({ product }: { product: any }) {
    return <div data-testid="product-card">{product.nome || product.title || "Produto"}</div>;
  };
});

// Dados simulados (Mock Data)
const mockProducts = [
  { id: "1", nome: "Camiseta", preco: 50 },
  { id: "2", nome: "Calça", preco: 120 },
];

describe("Componente ProductList", () => {
  const mockSetFavorites = jest.fn();

  beforeEach(() => {
    // Configura o retorno do hook antes de cada teste
    (useFavoritesContext as jest.Mock).mockReturnValue({
      setFavorites: mockSetFavorites,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar o título corretamente", () => {
    render(<ProductList products={mockProducts} />);

    const titleElement = screen.getByRole("heading", {
      name: /produtos disponíveis:/i,
    });
    expect(titleElement).toBeInTheDocument();
  });

  test("deve renderizar a quantidade correta de cards de produtos", () => {
    render(<ProductList products={mockProducts} />);

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(mockProducts.length);
  });

  test("não deve renderizar nenhum card quando a lista de produtos estiver vazia", () => {
    render(<ProductList products={[]} />);

    const productCards = screen.queryAllByTestId("product-card");
    expect(productCards).toHaveLength(0);
  });
});
