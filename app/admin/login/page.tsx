"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

export default function AdminLoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {

    try {

      setLoading(true)

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.log(error)
        alert("Email ou senha inválidos")
        return
      }

      router.push("/admin/dashboard")

    } catch (err) {

      console.log(err)
      alert("Erro inesperado")

    } finally {

      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold mb-2">
          Login Admin
        </h1>

        <p className="text-zinc-400 mb-8">
          Entre para acessar o painel.
        </p>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl outline-none"
          />

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="bg-white text-black py-4 rounded-2xl font-semibold mt-4 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button
              onClick={() => router.push("/")}
              className="bg-white text-black py-4 rounded-2xl font-semibold mt-4 disabled:opacity-50"
            >
              Voltar
            </button>
        </div>

      </div>

    </main>
  )
}