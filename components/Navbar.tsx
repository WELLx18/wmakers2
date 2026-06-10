"use client"

import { ShoppingCart } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

import { useRouter } from "next/navigation"

import { useCart } from "@/contexts/CartContext"

export function Navbar() {

  const router = useRouter()

  const { cart } = useCart()

  // TOTAL DE ITENS
  const totalItems = cart.reduce((acc, item) => {

    return acc + item.quantity

  }, 0)

  return (
    <header className="w-full border-b border-blue-950/50 bg-[#050A14]/80 backdrop-blur-md sticky top-0 z-50">

      {/* CONTAINER */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="
            flex items-center
            cursor-pointer
            select-none
            transition-transform
            active:scale-95
          "
        >

          <Image
            src="/logo.png"
            alt="WMaker's Logo"
            width={45}
            height={45}
            className="object-contain"
            priority
          />

        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-4 sm:gap-6 text-sm text-blue-300">

          <a
            href="/contato"
            className="
              hover:text-blue-400
              transition-colors
              font-medium
            "
          >
            Contato
          </a>

          <a
            href="/admin/dashboard"
            className="
              hover:text-blue-400
              transition-colors
              font-medium
            "
          >
            Admin
          </a>

          {/* CARRINHO */}
          <button
            onClick={() => router.push("/cart")}
            className="
              relative

              flex items-center gap-3

              px-4 py-2.5

              border border-blue-900/50
              rounded-2xl

              bg-[#0A1324]

              hover:bg-blue-950/40
              hover:border-blue-700

              text-blue-300

              transition-all
            "
          >

            <div className="relative">

              <ShoppingCart size={20} />

              {/* BADGE */}
              {totalItems > 0 && (

                <span
                  className="
                    absolute
                    -top-2
                    -right-2

                    min-w-[20px]
                    h-5

                    flex items-center justify-center

                    bg-blue-500
                    text-white

                    text-[11px]
                    font-bold

                    rounded-full

                    px-1
                  "
                >
                  {totalItems}
                </span>

              )}

            </div>

            <span className="hidden sm:block font-medium">
              Carrinho
            </span>

          </button>

        </nav>

      </div>

    </header>
  )
}
