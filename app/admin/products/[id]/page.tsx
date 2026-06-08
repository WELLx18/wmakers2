"use client"

import { useEffect, useState } from "react"

import { useParams, useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"
import { AdminProtection } from "@/components/AdminProtection"

export default function EditProductPage() {

  const params = useParams()
  const router = useRouter()

  const productId = params.id as string

  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  const [imageUrl, setImageUrl] = useState("")
  const [newImage, setNewImage] = useState<File | null>(null)

  async function loadProduct() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single()

    if (error) {
      console.log(error)
      alert("Produto não encontrado")
      return
    }

    setName(data.name)
    setDescription(data.description)
    setPrice(String(data.price))
    setCategory(data.category)
    setImageUrl(data.image_url)

    setLoading(false)
  }

  async function handleUpdateProduct() {

    try {

      let finalImageUrl = imageUrl

      // SE TROCAR IMAGEM
      if (newImage) {

        const fileName = `${Date.now()}-${newImage.name}`

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, newImage, {
            cacheControl: "3600",
            upsert: false
          })

        if (uploadError) {
          console.log(uploadError)
          alert("Erro ao enviar nova imagem")
          return
        }

        finalImageUrl = supabase.storage
          .from("products")
          .getPublicUrl(fileName).data.publicUrl

        // tenta remover antiga
        function extractStoragePath(imageUrl: string) {

        // pega tudo depois de /object/public/
        const match = imageUrl.match(/products\/(.+)$/)

        return match ? `products/${match[1]}` : null
     }

        const oldPath = extractStoragePath(imageUrl)

        if (oldPath) {

        const { error } = await supabase.storage
            .from("products")
            .remove([oldPath])

        console.log("Tentando remover:", oldPath)

        if (error) {
            console.log("Erro ao remover imagem:", error)
            }
        }
      }

      const { error } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          category: category.trim(),
          image_url: finalImageUrl
        })
        .eq("id", productId)

      if (error) {
        console.log(error)
        alert("Erro ao atualizar produto")
        return
      }

      alert("Produto atualizado com sucesso!")

      router.push("/admin/products")

    } catch (err) {
      console.log(err)
      alert("Erro inesperado")
    }
  }

  useEffect(() => {
    loadProduct()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Carregando...
      </main>
    )
  }

  return (
    <AdminProtection>

      <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">

        <div className="max-w-3xl mx-auto">

          {/* BACK */}
          <div className="flex justify-end mb-8">

            <a
              href="/admin/products"
              className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl hover:border-white transition"
            >
              ← Voltar
            </a>

          </div>

          {/* HEADER */}
          <div className="mb-10">

            <h1 className="text-5xl font-bold">
              Editar Produto
            </h1>

            <p className="text-zinc-400 mt-4">
              Atualize informações e imagem do produto.
            </p>

          </div>

          {/* FORM */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">

            <div className="flex flex-col gap-5">

              {/* IMAGEM ATUAL */}
              <img
                src={imageUrl}
                className="w-full h-80 object-cover rounded-3xl"
              />

              {/* NOVA IMAGEM */}
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">
                  Trocar imagem (opcional)
                </label>

                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setNewImage(e.target.files[0])
                    }
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl"
                />
              </div>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl"
                placeholder="Nome"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl h-32"
                placeholder="Descrição"
              />

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl"
                placeholder="Preço"
              />

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl"
                placeholder="Categoria"
              />

              <button
                onClick={handleUpdateProduct}
                className="bg-white text-black py-4 rounded-2xl font-semibold"
              >
                Salvar alterações
              </button>

            </div>

          </div>

        </div>

      </main>

    </AdminProtection>
  )
}