import { Navbar } from '../components/navbar/navbar';

export default function Cart() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Navbar />

      <hr />

      <section style={{ margin: '20px 0' }}>
        <h3>Produtos selecionados</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #000' }}>
              <th>Produto</th>
              <th>Valor Unitário</th>
              <th>Quantidade</th>
              <th>Valor Total</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monitor UltraWide 34</td>
              <td>R$ 2200.00</td>
              <td>1</td>
              <td>R$ 2200.00</td>
              <td><button>Remover</button></td>
            </tr>
            <tr>
              <td>Teclado Mecânico RGB</td>
              <td>R$ 450.00</td>
              <td>2</td>
              <td>R$ 900.00</td>
              <td><button>Remover</button></td>
            </tr>
            <tr>
              <td>Mouse Gamer Sem Fio</td>
              <td>R$ 350.00</td>
              <td>2</td>
              <td>R$ 700.00</td>
              <td><button>Remover</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      <hr />
      <section style={{ margin: '20px 0' }}>
        <h3>Resumo do Carrinho</h3>
        <p>Quantidade total: 5</p>
        <p>Valor total: R$3800.00</p>
      </section>
    </div>
  );
}