'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router  = useRouter()
  const [email, setEmail] = useState('')
  const [pass,  setPass]  = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.signInWithPassword({ email, password: pass })
      if (err) {
        setError('E-mail ou senha incorretos.')
      } else {
        router.push('/')
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-charcoal flex flex-col items-center justify-center px-6 py-[80px]">
      {/* Logo */}
      <Link href="/" className="font-display font-light text-3xl tracking-display uppercase text-offwhite/55 hover:text-offwhite/80 transition-colors leading-[1.3] mb-[60px] text-center">
        Alison<br />Estevam
      </Link>

      {/* Card */}
      <div className="w-full max-w-[380px]">
        <div className="mb-8">
          <p className="font-body font-light text-xs tracking-[0.45em] uppercase text-sage mb-3">
            Área do Cliente
          </p>
          <h1 className="font-display font-light text-4xl text-offwhite tracking-[0.03em]">
            Entrar
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={cn(
                'w-full bg-offwhite/4 border border-offwhite/10 px-4 py-[13px]',
                'font-body font-light text-base text-offwhite placeholder:text-offwhite/20',
                'transition-colors duration-250',
                'focus:outline-none focus:border-sage/60 focus:bg-offwhite/6'
              )}
              placeholder="seu@email.com"
            />
          </div>

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
              autoComplete="current-password"
              required
              value={pass}
              onChange={e => setPass(e.target.value)}
              className={cn(
                'w-full bg-offwhite/4 border border-offwhite/10 px-4 py-[13px]',
                'font-body font-light text-base text-offwhite placeholder:text-offwhite/20',
                'transition-colors duration-250',
                'focus:outline-none focus:border-sage/60 focus:bg-offwhite/6'
              )}
              placeholder="••••••••"
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
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 flex flex-col gap-3 items-center">
          <Link
            href="/cadastro"
            className="font-body font-light text-xs tracking-[0.25em] uppercase text-offwhite/28 hover:text-offwhite/55 transition-colors"
          >
            Não tem conta? Cadastre-se
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
