import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteItem from "./FavoriteItem";
import { calculatePriceWithDiscount } from "../../helpers"; // Ajuste os '../' se necessário

// 1. Mock do helper de cálculo
jest.mock("../../helpers", () => ({
  calculatePriceWithDiscount: jest.fn(),
}));

// Dados simulados do Produto
const mockFavoriteItem = {
  id: "prod-1",
  nome: "Teclado Mecânico",
  descricao: "Teclado switch azul",
  preco: 200, // No componente é convertido com Number()
  desconto: 10,
  fotos: [
    { src: "/teclado.jpg", titulo: "Foto do Teclado" }
  ],
};

describe("Componente FavoriteItem", () => {
  const mockSetFavorites = jest.fn();

  beforeEach(() => {
    // Definimos que o cálculo do desconto retornará 180 fixo para esse teste
    (calculatePriceWithDiscount as jest.Mock).mockReturnValue(180);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Função auxiliar para envelopar o <FavoriteItem> em uma tabela válida
  const renderComponent = () => {
    return render(
      <table>
        <tbody>
          <FavoriteItem
            favoriteItem={mockFavoriteItem as any}
            setFavorites={mockSetFavorites}
          />
        </tbody>
      </table>
    );
  };

  test("deve renderizar as informações e a imagem do produto corretamente", () => {
    renderComponent();

    // Verifica imagem pelo 'alt'
    const image = screen.getByRole("img", { name: "Foto do Teclado" });
    expect(image).toBeInTheDocument();
    // O Next.js adiciona parâmetros na URL da imagem gerada, então checamos se inclui o src original
    expect(image.getAttribute("src")).toContain(encodeURIComponent("/teclado.jpg"));

    // Verifica textos
    expect(screen.getByText("Teclado Mecânico")).toBeInTheDocument();
    expect(screen.getByText("Teclado switch azul")).toBeInTheDocument();

    // Verifica se o helper foi chamado com os valores corretos e renderizado
    expect(calculatePriceWithDiscount).toHaveBeenCalledWith(200, 10);
    expect(screen.getByText(/180\.00/i)).toBeInTheDocument();

    // Verifica porcentagem
    expect(screen.getByText("10%")).toBeInTheDocument();
  });

  test("deve chamar a função setFavorites passando um callback que remove o item", () => {
    renderComponent();

    // Clica no botão de remover
    const btnRemover = screen.getByRole("button", { name: /remover/i });
    fireEvent.click(btnRemover);

    // Garante que o hook de estado foi acionado 1 vez
    expect(mockSetFavorites).toHaveBeenCalledTimes(1);

    // TESTE AVANÇADO: Extrai a função callback (favorites) => favorites.filter(...) passada para o state
    const stateUpdaterCallback = mockSetFavorites.mock.calls[0][0];

    // Simula uma lista de favoritos que já existia no estado
    const estadoAnterior = [
      { id: "prod-1", nome: "Teclado" },
      { id: "prod-2", nome: "Mouse" }
    ];

    // Executa a função passando a lista simulada
    const novoEstado = stateUpdaterCallback(estadoAnterior);

    // O novo estado só deve conter o item que NÃO foi clicado
    expect(novoEstado).toHaveLength(1);
    expect(novoEstado[0].id).toBe("prod-2");
  });
});
