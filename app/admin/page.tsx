"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import { AdminProtection } from "@/components/AdminProtection"

export default function AdminPage() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const [categories, setCategories] = useState<any[]>([])

  // =========================
  // LOAD CATEGORIES
  // =========================
  useEffect(() => {

    async function loadCategories() {

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      if (error) {
        console.log(error)
        return
      }

      setCategories(data || [])
    }

    loadCategories()

  }, [])

  async function handleCreateProduct() {

    try {

      // VALIDAÇÕES
      if (!name || !description || !price) {
        alert("Preencha todos os campos")
        return
      }

      if (!category) {
        alert("Selecione uma categoria")
        return
      }

      if (!image) {
        alert("Selecione uma imagem")
        return
      }

      const fileName = `${Date.now()}-${image.name}`

      // Upload imagem
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, image, {
          cacheControl: "3600",
          upsert: false
        })

      if (uploadError) {
        console.log(uploadError)
        alert("Erro ao fazer upload")
        return
      }

      // URL pública
      const imageUrl = supabase.storage
        .from("products")
        .getPublicUrl(fileName).data.publicUrl

      // Salvar produto
      const { error } = await supabase
        .from("products")
        .insert({
          name,
          description,
          price: Number(price),
          category_id: category,
          image_url: imageUrl
        })

      if (error) {
        console.log(error)
        alert("Erro ao salvar produto")
        return
      }

      alert("Produto criado com sucesso!")

      // RESET
      setName("")
      setDescription("")
      setPrice("")
      setCategory("")
      setImage(null)

    } catch (err) {

      console.log(err)
      alert("Erro inesperado")
    }
  }

  return (
    <AdminProtection>

      <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">

        <div className="max-w-3xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">

            <div className="flex items-center justify-between gap-4 flex-wrap">

              <div>

                <span className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm text-zinc-400">
                  Painel Administrativo
                </span>

                <h1 className="text-5xl font-bold mt-6">
                  Criar Produto
                </h1>

                <p className="text-zinc-400 mt-4 text-lg">
                  Adicione novos produtos à sua loja WMaker's.
                </p>

              </div>

              <a
                href="/admin/products"
                className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
              >
                Ver Produtos
              </a>

              <a
                href="/admin/dashboard"
                className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
              >
                Voltar ao Dashboard
              </a>

            </div>

          </div>

          {/* FORM */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">

            <div className="flex flex-col gap-5">

              {/* NAME */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Nome do produto
                </label>

                <input
                  type="text"
                  placeholder="Ex: Dragão Articulado"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-white transition"
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Descrição
                </label>

                <textarea
                  placeholder="Descrição do produto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-white transition h-36 resize-none"
                />

              </div>

              {/* PRICE */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Preço
                </label>

                <input
                  type="number"
                  placeholder="Ex: 89.90"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-white transition"
                />

              </div>

              {/* CATEGORY */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Categoria
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    w-full
                    bg-zinc-950
                    border
                    border-zinc-800
                    p-4
                    rounded-2xl
                    outline-none
                    focus:border-white
                    transition
                  "
                >

                  <option value="">
                    Selecione uma categoria
                  </option>

                  {categories.map((cat) => (

                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </option>

                  ))}

                </select>

              </div>

              {/* IMAGE */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Imagem do produto
                </label>

                <input
                  type="file"
                  onChange={(e) => {

                    if (e.target.files?.[0]) {
                      setImage(e.target.files[0])
                    }
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl file:bg-white file:text-black file:border-0 file:px-4 file:py-2 file:rounded-xl file:mr-4"
                />

              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleCreateProduct}
                className="mt-4 bg-white text-black hover:bg-zinc-300 transition py-4 rounded-2xl text-lg font-semibold"
              >
                Criar Produto
              </button>

            </div>

          </div>

        </div>

      </main>

    </AdminProtection>
  )
}
