"use client"

import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

import { AdminProtection } from "@/components/AdminProtection"

export default function DashboardPage() {

  const router = useRouter()

  async function handleLogout() {

    await supabase.auth.signOut()

    router.push("/admin/login")
  }

  return (
    <AdminProtection>

      <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">

            <div>

              <span className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm text-zinc-400">
                WMaker's Admin
              </span>

              <h1 className="text-5xl font-bold mt-6">
                Dashboard
              </h1>

              <p className="text-zinc-400 mt-4 text-lg">
                Gerencie sua loja de impressão 3D.
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
            >
              Sair
            </button>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <a
              href="/admin"
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-white transition"
            >

              <h2 className="text-3xl font-bold">
                Criar Produto
              </h2>

              <p className="text-zinc-400 mt-4">
                Adicione novos produtos à loja.
              </p>

            </a>

            <a
              href="/admin/products"
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-white transition"
            >

              <h2 className="text-3xl font-bold">
                Produtos
              </h2>

              <p className="text-zinc-400 mt-4">
                Edite e exclua produtos.
              </p>

            </a>

            <a
              href="/admin/categories"
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-white transition"
            >

              <h2 className="text-3xl font-bold">
                Categorias
              </h2>

              <p className="text-zinc-400 mt-4">
                Organize os produtos da loja.
              </p>

            </a>

            <a
              href="/admin/orders"
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-white transition"
            >

              <h2 className="text-3xl font-bold">
                Pedidos
              </h2>

              <p className="text-zinc-400 mt-4">
                Gerencie pedidos dos clientes.
              </p>

            </a>

            <a
              href="/admin/admins"
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-white transition"
            >

              <h2 className="text-3xl font-bold">
                Administradores
              </h2>

              <p className="text-zinc-400 mt-4">
                Gerencie acessos administrativos.
              </p>

            </a>

          </div>

        </div>

      </main>

    </AdminProtection>
  )
}