'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function CadastroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name:     '',
    email:    '',
    phone:    '',
    password: '',
    confirm:  '',
  })
  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirm) {
      setError('As senhas não coincidem.')
      return
    }
    if (form.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.signUp({
        email:    form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
            phone:     form.phone,
          },
        },
      })
      if (err) {
        setError(err.message === 'User already registered'
          ? 'Este e-mail já está cadastrado.'
          : 'Erro ao criar conta. Tente novamente.')
      } else {
        setDone(true)
      }
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-svh bg-charcoal flex flex-col items-center justify-center px-6 text-center">
        <div className="w-[38px] h-px bg-gold/45 mb-8 mx-auto" aria-hidden="true" />
        <h1 className="font-display font-light text-4xl text-offwhite tracking-[0.04em] mb-4">
          Conta criada
        </h1>
        <p className="font-body font-light text-base text-offwhite/45 max-w-[320px] leading-[2] mb-8">
          Verifique seu e-mail para confirmar o cadastro e então acesse sua conta.
        </p>
        <Link
          href="/login"
          className="font-body font-light text-xs tracking-[0.38em] uppercase text-charcoal-deep bg-gold px-7 py-[13px] transition-all duration-300 hover:bg-gold-light"
        >
          Ir para o login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-charcoal flex flex-col items-center justify-center px-6 py-[80px]">
      {/* Logo */}
      <Link href="/" className="font-display font-light text-3xl tracking-display uppercase text-offwhite/55 hover:text-offwhite/80 transition-colors leading-[1.3] mb-[60px] text-center">
        Alison<br />Estevam
      </Link>

      {/* Card */}
      <div className="w-full max-w-[420px]">
        <div className="mb-8">
          <p className="font-body font-light text-xs tracking-[0.45em] uppercase text-sage mb-3">
            Área do Cliente
          </p>
          <h1 className="font-display font-light text-4xl text-offwhite tracking-[0.03em]">
            Criar conta
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-body font-light text-xs tracking-[0.3em] uppercase text-offwhite/35 mb-2"
            >
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={set('name')}
              className={cn(
                'w-full bg-offwhite/4 border border-offwhite/10 px-4 py-[13px]',
                'font-body font-light text-base text-offwhite placeholder:text-offwhite/20',
                'transition-colors duration-250 focus:outline-none focus:border-sage/60 focus:bg-offwhite/6'
              )}
              placeholder="Seu nome"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block font-body font-light text-xs tracking-[0.3em] uppercase text-offwhite/35 mb-2"
            >
              WhatsApp / Telefone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={set('phone')}
              className={cn(
                'w-full bg-offwhite/4 border border-offwhite/10 px-4 py-[13px]',
                'font-body font-light text-base text-offwhite placeholder:text-offwhite/20',
                'transition-colors duration-250 focus:outline-none focus:border-sage/60 focus:bg-offwhite/6'
              )}
              placeholder="(11) 99999-9999"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-body font-light text-xs tracking-[0.3em] uppercase text-offwhite/35 mb-2"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={set('email')}
              className={cn(
                'w-full bg-offwhite/4 border border-offwhite/10 px-4 py-[13px]',
                'font-body font-light text-base text-offwhite placeholder:text-offwhite/20',
                'transition-colors duration-250 focus:outline-none focus:border-sage/60 focus:bg-offwhite/6'
              )}
              placeholder="seu@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block font-body font-light text-xs tracking-[0.3em] uppercase text-offwhite/35 mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={set('password')}
              className={cn(
                'w-full bg-offwhite/4 border border-offwhite/10 px-4 py-[13px]',
                'font-body font-light text-base text-offwhite placeholder:text-offwhite/20',
                'transition-colors duration-250 focus:outline-none focus:border-sage/60 focus:bg-offwhite/6'
              )}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {/* Confirm */}
          <div>
            <label
              htmlFor="confirm"
              className="block font-body font-light text-xs tracking-[0.3em] uppercase text-offwhite/35 mb-2"
            >
              Confirmar senha
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={form.confirm}
              onChange={set('confirm')}
              className={cn(
                'w-full bg-offwhite/4 border border-offwhite/10 px-4 py-[13px]',
                'font-body font-light text-base text-offwhite placeholder:text-offwhite/20',
                'transition-colors duration-250 focus:outline-none focus:border-sage/60 focus:bg-offwhite/6'
              )}
              placeholder="Repita a senha"
            />
          </div>

          {error && (
            <p className="font-body font-light text-xs tracking-[0.12em] text-error/70">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'mt-2 w-full py-[14px]',
              'font-body font-light text-xs tracking-[0.4em] uppercase',
              'text-charcoal-deep bg-gold',
              'transition-all duration-300 hover:bg-gold-light hover:-translate-y-px',
              'disabled:opacity-50 disabled:translate-y-0'
            )}
          >
            {loading ? 'Criando conta…' : 'Criar conta'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 flex flex-col gap-3 items-center">
          <Link
            href="/login"
            className="font-body font-light text-xs tracking-[0.25em] uppercase text-offwhite/28 hover:text-offwhite/55 transition-colors"
          >
            Já tem conta? Entrar
          </Link>
          <Link
            href="/"
            className="font-body font-light text-xs tracking-[0.25em] uppercase text-offwhite/18 hover:text-offwhite/40 transition-colors"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
