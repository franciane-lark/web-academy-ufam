'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/login' || pathname === '/register' || pathname === '/cadastro') {
    return null;
  }

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">
          Loja WA
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/cart">
                Carrinho
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favorites">
                Favoritos
              </Link>
            </li>
          </ul>
        </div>
        <button onClick={handleLogout} className="btn btn-dark btn-sm px-3">
          Sair
        </button>
      </div>
    </nav>
  );
}