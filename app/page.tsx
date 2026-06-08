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
    <main className="min-h-screen bg-[#050A14] text-white w-full overflow-x-hidden">
      {/* Navbar que acompanha a largura fluida */}
      <Navbar />

      {/* HERO SECTION 
          - w-full e px-4 para telas pequenas (celulares não colam na borda)
          - md:px-10 e max-w-[1440px] para telas grandes (evita esticar infinitamente)
      */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-20 md:py-28 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mt-6 leading-tight">
          Catálogo <span className="text-blue-500 italic">WMaker’s</span>
        </h1>

        <p className="text-blue-200 mt-6 max-w-2xl mx-auto text-sm sm:text-base">
          Peças únicas impressas sob demanda. Escolha, personalize e peça.
        </p>

        {/* Categorias rápidas responsivas */}
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

      {/* SEÇÃO DE CATEGORIAS 
          - Alinhada perfeitamente com o mesmo limite máximo de 1440px
      */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10">
        <CategoriesSection />
      </div>

      {/* SEÇÃO DE PRODUTOS 
          - Grid inteligente que muda a quantidade de colunas de acordo com a tela do dispositivo
      */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-28 mt-16">
        <div className="flex justify-between items-center mb-10 border-b border-blue-950/50 pb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-100">
            Todos os produtos
          </h2>
          <span className="text-xs text-blue-400 bg-blue-950/40 px-3 py-1 rounded-full border border-blue-900/30">
            Atualizado em tempo real
          </span>
        </div>

        {products.length === 0 ? (
          <p className="text-blue-300 text-center py-10">
            Nenhum produto encontrado no momento.
          </p>
        ) : (
          /* MÁGICA DA RESPONSIVIDADE AUTOMÁTICA:
            - grid-cols-1: 1 produto por linha em celulares pequenos (vertical)
            - sm:grid-cols-2: 2 produtos por linha em celulares deitados ou tablets pequenos
            - md:grid-cols-3: 3 produtos por linha em tablets grandes e notebooks
            - lg:grid-cols-4: 4 produtos por linha em computadores desktop comuns e grandes
            - gap-6 md:gap-8: espaçamento confortável entre os cards
          */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full">
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