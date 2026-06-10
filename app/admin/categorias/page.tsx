
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

export default function AdminCategoriasPage() {

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState<any[]>([])

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")

  // =========================
  // VERIFICA LOGIN
  // =========================
  useEffect(() => {

    async function initialize() {

      const {
        data: { session }
      } = await supabase.auth.getSession()

      // NÃO LOGADO
      if (!session) {
        router.push("/login")
        return
      }

      setLoading(false)

      loadCategories()
    }

    initialize()

  }, [])

  // =========================
  // CARREGA CATEGORIAS
  // =========================
  async function loadCategories() {

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setCategories(data || [])
  }

  // =========================
  // CRIAR CATEGORIA
  // =========================
  async function createCategory() {

    if (!name) {
      alert("Digite um nome")
      return
    }

    const generatedSlug = slug
      ? slug.toLowerCase().replaceAll(" ", "-")
      : name.toLowerCase().replaceAll(" ", "-")

    const { error } = await supabase
      .from("categories")
      .insert({
        name,
        slug: generatedSlug
      })

    if (error) {
      console.log(error)
      alert("Erro ao criar categoria")
      return
    }

    setName("")
    setSlug("")

    loadCategories()
  }

  // =========================
  // DELETAR
  // =========================
  async function deleteCategory(id: string) {

    const confirmDelete = confirm(
      "Tem certeza que deseja deletar esta categoria?"
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)

    if (error) {
      console.log(error)
      alert("Erro ao deletar categoria")
      return
    }

    loadCategories()
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center">
        <p className="text-blue-300">
          Carregando...
        </p>
      </main>
    )
  }

  // =========================
  // PAGE
  // =========================
  return (
    <main className="min-h-screen bg-[#050A14] text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">

        <div className="flex items-center justify-between gap-4 flex-wrap">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold text-blue-100">
              Categorias
            </h1>

            <p className="text-blue-300 mt-2">
              Gerencie as categorias da loja.
            </p>

          </div>

          <a
            href="/admin/dashboard"
            className="
              bg-blue-500
              hover:bg-blue-600
              transition-all
              px-6 py-3
              rounded-xl
              font-medium
              text-white
            "
          >
            Voltar ao Dashboard
          </a>

        </div>

      </div>

      {/* FORM */}
      <div
        className="
          border border-blue-500/20
          bg-white/5
          backdrop-blur-md
          rounded-2xl
          p-6
          mb-10
        "
      >

        <h2 className="text-xl font-semibold mb-6">
          Criar categoria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* NOME */}
          <input
            type="text"
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              bg-[#0A1324]
              border border-blue-500/20
              rounded-xl
              px-4 py-3
              outline-none
              focus:border-blue-500
            "
          />

          {/* SLUG */}
          <input
            type="text"
            placeholder="slug-da-categoria"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="
              bg-[#0A1324]
              border border-blue-500/20
              rounded-xl
              px-4 py-3
              outline-none
              focus:border-blue-500
            "
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={createCategory}
          className="
            mt-6
            bg-blue-500
            hover:bg-blue-600
            transition-all
            px-6 py-3
            rounded-xl
            font-medium
          "
        >
          Criar categoria
        </button>

      </div>

      {/* LISTA */}
      <div className="space-y-4">

        {categories.map((category) => (

          <div
            key={category.id}
            className="
              flex flex-col md:flex-row
              md:items-center
              md:justify-between
              gap-4

              border border-blue-500/20
              bg-white/5
              backdrop-blur-md
              rounded-2xl
              p-5
            "
          >

            {/* INFO */}
            <div>

              <h3 className="text-lg font-semibold">
                {category.name}
              </h3>

              <p className="text-blue-300 text-sm mt-1">
                /categoria/{category.slug}
              </p>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">

              <button
                className="
                  bg-yellow-500/20
                  border border-yellow-500/20
                  text-yellow-300
                  px-4 py-2
                  rounded-lg
                "
              >
                Editar
              </button>

              <button
                onClick={() => deleteCategory(category.id)}
                className="
                  bg-red-500/20
                  border border-red-500/20
                  text-red-300
                  px-4 py-2
                  rounded-lg
                  hover:bg-red-500/30
                  transition-all
                "
              >
                Deletar
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}
