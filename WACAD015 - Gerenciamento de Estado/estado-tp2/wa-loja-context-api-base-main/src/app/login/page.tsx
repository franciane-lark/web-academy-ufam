'use client'

import { useState } from 'react'
import { useAuthContext } from '@/context/Auth/AuthProvider'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const { login } = useAuthContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      login(email)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Seu e-mail" 
        required 
      />
      <button type="submit">Entrar</button>
    </form>
  )
}