import Link from 'next/link';

export function Navbar() {
  return (
    <header style={{ paddingBottom: '10px' }}>
      <h2 style={{ color: '#a020f0', textDecoration: 'underline' }}>WA Loja</h2>
      <nav>
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/cart">Carrinho</Link>
          </li>
        </ul>
      </nav>
      <button>Sair</button>
    </header>
  );
}