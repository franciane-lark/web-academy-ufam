import { render, screen } from "@testing-library/react";
import FavoritesList from "./FavoritesList";

// 1. Imports dos hooks usando caminhos relativos
import { useFavoritesContext } from "../../hooks/useFavoritesContext";
import { useFavoriteProducts } from "../../hooks/useFavoriteProducts";
import { useFavoritesTotalValue } from "../../hooks/useFavoritesTotalValue";

// 2. Mocks dos Hooks
jest.mock("../../hooks/useFavoritesContext", () => ({
  useFavoritesContext: jest.fn(),
}));

jest.mock("../../hooks/useFavoriteProducts", () => ({
  useFavoriteProducts: jest.fn(),
}));

jest.mock("../../hooks/useFavoritesTotalValue", () => ({
  useFavoritesTotalValue: jest.fn(),
}));

// 3. Mock do componente filho (FavoriteItem)
jest.mock("../FavoriteItem/FavoriteItem", () => {
  return function MockFavoriteItem({ favoriteItem }: { favoriteItem: any }) {
    return (
      <tr data-testid="favorite-item">
        <td>{favoriteItem.nome || "Produto Teste"}</td>
      </tr>
    );
  };
});

describe("Componente FavoritesList", () => {
  const mockSetFavorites = jest.fn();

  beforeEach(() => {
    // Configuração padrão do context
    (useFavoritesContext as jest.Mock).mockReturnValue({
      setFavorites: mockSetFavorites,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar a mensagem de lista vazia quando não houver favoritos", () => {
    // Configura os hooks para retornar lista vazia e total 0
    (useFavoriteProducts as jest.Mock).mockReturnValue([]);
    (useFavoritesTotalValue as jest.Mock).mockReturnValue("0,00");

    render(<FavoritesList />);

    // Verifica o título
    expect(
      screen.getByRole("heading", { name: /lista de favoritos:/i })
    ).toBeInTheDocument();

    // Verifica a mensagem de lista vazia
    expect(
      screen.getByText("Sua lista de favoritos está vazia.")
    ).toBeInTheDocument();

    // Verifica os valores do rodapé
    expect(screen.getByText(/quantidade de produtos: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/valor total: r\$ 0,00/i)).toBeInTheDocument();

    // Garante que a tabela NÃO foi renderizada
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  test("deve renderizar a tabela com os itens quando houver favoritos", () => {
    const mockItems = [
      { id: "1", nome: "Camiseta" },
      { id: "2", nome: "Tênis" },
    ];

    // Configura os hooks para retornar itens simulados e total calculado
    (useFavoriteProducts as jest.Mock).mockReturnValue(mockItems);
    (useFavoritesTotalValue as jest.Mock).mockReturnValue("250,00");

    render(<FavoritesList />);

    // Verifica que a mensagem de lista vazia NÃO aparece
    expect(
      screen.queryByText("Sua lista de favoritos está vazia.")
    ).not.toBeInTheDocument();

    // Verifica se a tabela e os cabeçalhos existem
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Produto")).toBeInTheDocument();
    expect(screen.getByText("Preço")).toBeInTheDocument();

    // Verifica se renderizou os 2 itens (linha por linha)
    const items = screen.getAllByTestId("favorite-item");
    expect(items).toHaveLength(2);

    // Verifica a contagem e o valor total no rodapé
    expect(screen.getByText(/quantidade de produtos: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/valor total: r\$ 250,00/i)).toBeInTheDocument();
  });
});
