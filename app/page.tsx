"use client"

import { useEffect, useState, Suspense } from "react"

import { useSearchParams } from "next/navigation"

import { supabase } from "@/lib/supabase"

import { Navbar } from "@/components/Navbar"
import { ProductCard } from "@/components/ProductCard"
import { CategoriesSection } from "@/components/CategoriesSection"
import { Footer } from "@/components/Footer"

function HomeContent() {
  const searchParams = useSearchParams()

  const categoryId = searchParams.get("category")

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {

    async function loadData() {

      // =========================
      // PRODUTOS
      // =========================
      let query = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      // FILTRO CATEGORIA
      if (categoryId) {
        query = query.eq("category_id", categoryId)
      }

      const {
        data: productsData,
        error: productsError
      } = await query

      if (productsError) {
        console.log(productsError)
      } else {
        setProducts(productsData || [])
      }

      // =========================
      // CATEGORIAS
      // =========================
      const {
        data: categoriesData,
        error: categoriesError
      } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      if (categoriesError) {
        console.log(categoriesError)
      } else {
        setCategories(categoriesData || [])
      }
    }

    loadData()

  }, [categoryId])

  return (
    <main className="min-h-screen bg-[#050A14] text-white w-full overflow-x-hidden">

      <Navbar />

      {/* HERO */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-20 md:py-28 text-center">

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mt-6 leading-tight">
          Catálogo <span className="text-blue-500 italic">WMaker’s</span>
        </h1>

        <p className="text-blue-200 mt-6 max-w-2xl mx-auto text-sm sm:text-base">
          Peças únicas impressas sob demanda. Escolha, personalize e peça.
        </p>

        {/* INFO */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">

          <div className="px-4 py-2 border border-blue-900 bg-[#0A1324] text-blue-300 text-xs sm:text-sm rounded-md">
            Mari • Sem mínimo • Frete grátis
          </div>

          <div className="px-4 py-2 border border-blue-900 bg-[#0A1324] text-blue-300 text-xs sm:text-sm rounded-md">
            Sapé • Min. 5 un. • Frete R$ 5
          </div>

          <div className="px-4 py-2 border border-blue-900 bg-[#0A1324] text-blue-300 text-xs sm:text-sm rounded-md">
            Guarabira • Min. 15 un. • Frete R$ 15
          </div>

        </div>

      </section>

      {/* CATEGORIAS */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10">

        <CategoriesSection categories={categories} />

      </div>

      {/* PRODUTOS */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-28 mt-16">

        <div className="flex justify-between items-center mb-10 border-b border-blue-950/50 pb-4">

          <h2 className="text-2xl md:text-3xl font-semibold text-blue-100">

            {categoryId
              ? "Produtos da categoria"
              : "Todos os produtos"
            }

          </h2>

          <span className="text-xs text-blue-400 bg-blue-950/40 px-3 py-1 rounded-full border border-blue-900/30">
            Atualizado em tempo real
          </span>

        </div>

        {products.length === 0 ? (

          <p className="text-blue-300 text-center py-10">
            Nenhum produto encontrado nesta categoria.
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url}
              />

            ))}

          </div>

        )}

      </section>

      <Footer />

    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}