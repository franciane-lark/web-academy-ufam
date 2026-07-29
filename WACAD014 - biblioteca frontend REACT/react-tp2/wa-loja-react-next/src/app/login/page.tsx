'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginFormInputs {
  email: string;
  senha: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Dados de Login:', data);
    router.push('/');
  };

  return (
    <div className="min-vh-100 d-flex">
      <div className="w-50 bg-light d-none d-md-flex align-items-center justify-content-center p-5">
        <h2 className="fw-bold">Bem vindo à WA Loja!</h2>
      </div>
      <div className="w-50 d-flex align-items-center justify-content-center p-5">
        <div style={{ maxWidth: '350px', width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label text-muted small">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', { required: 'O e-mail é obrigatório' })}
              />
              {errors.email && (
                <span className="text-danger small">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-muted small">Senha</label>
              <input
                type="password"
                className={`form-control ${errors.senha ? 'is-invalid' : ''}`}
                {...register('senha', {
                  required: 'A senha é obrigatória',
                  minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres' },
                })}
              />
              {errors.senha && (
                <span className="text-danger small">{errors.senha.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-success w-100 mb-3">
              Entrar
            </button>

            <div className="text-center">
              <Link href="/register" className="small text-decoration-none">
                não tenho cadastro
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}