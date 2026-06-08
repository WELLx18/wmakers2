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
    <main className="min-h-screen bg-white text-black">

      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="max-w-4xl">

          <span className="bg-zinc-100 px-4 py-2 rounded-full text-sm">
            Impressões 3D Premium
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight">
            Transformando ideias em peças reais.
          </h1>

          <p className="text-zinc-500 text-lg md:text-xl mt-8 max-w-2xl">
            Produtos decorativos, articulados e personalizados produzidos com acabamento profissional.
          </p>

        </div>

      </section>

      {/* CATEGORIAS */}
      <CategoriesSection />

      {/* PRODUTOS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Produtos
          </h2>

        </div>

        {products.length === 0 ? (

          <p className="text-zinc-500">
            Nenhum produto encontrado.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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