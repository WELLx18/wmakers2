"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"
import { AdminProtection } from "@/components/AdminProtection"

type Product = {
  id: string
  name: string
  price: number
  category: string
  image_url: string
}

export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([])

  async function loadProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setProducts(data || [])
  }

  async function handleDeleteProduct(id: string, imageUrl: string) {

    const confirmDelete = confirm("Deseja realmente excluir este produto?")
    if (!confirmDelete) return

    try {

      // 1. remove do banco (principal)
      const { error: dbError } = await supabase
        .from("products")
        .delete()
        .eq("id", id)

      if (dbError) {
        console.log(dbError)
        alert("Erro ao deletar produto no banco")
        return
      }

      // 2. remove imagem do storage (secundário)
      const fileName = imageUrl?.split("/").pop()

      if (fileName) {
        await supabase.storage
          .from("products")
          .remove([fileName])
      }

      // 3. atualiza UI sem refetch
      setProducts((prev) => prev.filter((p) => p.id !== id))

      alert("Produto excluído com sucesso!")

    } catch (err) {
      console.log(err)
      alert("Erro inesperado ao deletar produto")
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <AdminProtection>

      <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

            <div>

              <span className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm text-zinc-400">
                Painel Administrativo
              </span>

              <h1 className="text-5xl font-bold mt-6">
                Produtos
              </h1>

              <p className="text-zinc-400 mt-4 text-lg">
                Gerencie os produtos da sua loja.
              </p>

            </div>

            <div className="flex gap-4">

              <a
                href="/admin"
                className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
              >
                Novo Produto
              </a>

              <a
                href="/admin/dashboard"
                className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl"
              >
                Dashboard
              </a>

            </div>

          </div>

          {/* CONTENT */}
          {products.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center text-zinc-400">
              Nenhum produto encontrado.
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
                >

                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h2 className="text-2xl font-bold">
                          {product.name}
                        </h2>

                        <p className="text-zinc-500 mt-2">
                          {product.category}
                        </p>

                      </div>

                      <span className="text-lg font-semibold">
                        R$ {product.price}
                      </span>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-8">

                      <a
                        href={`/admin/products/${product.id}`}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 transition py-3 rounded-2xl text-center"
                      >
                        Editar
                      </a>

                      <button
                        onClick={() =>
                          handleDeleteProduct(
                            product.id,
                            product.image_url
                          )
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl"
                      >
                        Excluir
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </AdminProtection>
  )
}