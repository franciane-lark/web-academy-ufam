import Image from 'next/image';
import { Navbar } from './components/navbar/navbar'

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Navbar />

      <hr />

      <section style={{ margin: '20px 0' }}>
        <h3>Resumo do Carrinho</h3>
        <p>Quantidade total: 3</p>
        <p>Valor total: R$1350.00</p>
      </section>

      <hr />

      <section>
        <h3>Produtos disponíveis:</h3>
        <div style={{ marginTop: '20px', maxWidth: '300px' }}>
          <Image 
            src="/placeholder.png" 
            alt="Placeholder do Produto" 
            width={150} 
            height={150} 
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <h4>Notebook Pro</h4>
          <p>R$ 5499</p>
          <button style={{ padding: '5px 10px', cursor: 'pointer' }}>
            Adicionar no carrinho
          </button>
        </div>
      </section>
    </div>
  );
}