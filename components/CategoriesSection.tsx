"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Props {
  categories: any[]
}

export function CategoriesSection({ categories }: Props) {

  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get("category")

  if (!categories.length) return null

  return (
    <section className="mb-20">

      <div className="flex flex-wrap gap-4 justify-center">

        {/* TODOS */}
        <Link
          href="/"
          className={`
            px-6 py-3
            rounded-xl
            border
            backdrop-blur-md
            transition-all

            ${
              !selectedCategory
                ? `
                  bg-blue-500/30
                  border-blue-400
                  text-white
                  shadow-[0_0_20px_rgba(59,130,246,0.35)]
                `
                : `
                  border-blue-500/20
                  bg-white/5
                  text-blue-200
                  hover:bg-blue-500/10
                `
            }
          `}
        >
          Todos
        </Link>

        {/* CATEGORIAS */}
        {categories.map((category) => {

          const isSelected = selectedCategory === category.id

          return (
            <Link
              key={category.id}
              href={`/?category=${category.id}`}
              className={`
                px-6 py-3
                rounded-xl
                border
                backdrop-blur-md
                transition-all

                ${
                  isSelected
                    ? `
                      bg-blue-500/30
                      border-blue-400
                      text-white
                      shadow-[0_0_20px_rgba(59,130,246,0.35)]
                    `
                    : `
                      border-blue-500/20
                      bg-white/5
                      text-blue-200
                      hover:bg-blue-500/10
                      hover:border-blue-400/40
                    `
                }
              `}
            >
              {category.name}
            </Link>
          )
        })}

      </div>

    </section>
  )
}

