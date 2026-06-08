"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import { Navbar } from "@/components/Navbar"
import { ProductCard } from "@/components/ProductCard"
import { CategoriesSection } from "@/components/CategoriesSection"
import { Footer } from "@/components/Footer"

export default function Home() {

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {

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

    loadProducts()

  }, [])

  return (
    <main className="min-h-screen bg-[#050A14] text-white">
      <Navbar />
      
      {/* HERO - Ajustado para max-w-7xl */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">

        <h1 className="text-5xl md:text-7xl font-semibold mt-6 leading-tight">
          Catálogo <span className="text-blue-500 italic">WMaker’s</span>
        </h1>

        <p className="text-blue-200 mt-6 max-w-2xl mx-auto">
          Peças únicas impressas sob demanda. Escolha, personalize e peça.
        </p>

        {/* categorias rápidas */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">

          <div className="px-4 py-2 border border-blue-900 bg-[#0A1324] text-blue-300 text-sm">
            Mari • Sem mínimo • Frete grátis
          </div>

          <div className="px-4 py-2 border border-blue-900 bg-[#0A1324] text-blue-300 text-sm">
            Sapé • Min. 5 un. • Frete R$ 5
          </div>

          <div className="px-4 py-2 border border-blue-900 bg-[#0A1324] text-blue-300 text-sm">
            Guarabira • Min. 15 un. • Frete R$ 15
          </div>

        </div>

      </section>

      {/* CATEGORIAS - Ajustado para max-w-7xl */}
      <div className="max-w-7xl mx-auto px-6">
        <CategoriesSection />
      </div>

      {/* PRODUTOS - Ajustado para max-w-7xl e grid com xl:grid-cols-4 */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-2xl md:text-3xl font-semibold text-blue-100">
            Todos os produtos
          </h2>

        </div>

        {products.length === 0 ? (

          <p className="text-blue-300">
            Nenhum produto encontrado.
          </p>

        ) : (

          /* Grid atualizada para dar mais espaço e alinhar até 4 itens */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

            {products.map((product) => (

              <ProductCard
                key={product.id}
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