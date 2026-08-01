'use client'

import { useAuthContext } from '@/context/Auth/AuthProvider'

export default function Navbar() {
  const { userEmail, logout } = useAuthContext()

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
      <span className="navbar-brand">Loja WA</span>
      
      <div className="ms-auto d-flex align-items-center gap-3">
        {userEmail && (
          <>
            <span>{userEmail}</span>
            <button className="btn btn-secondary btn-sm" onClick={logout}>
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  )
}