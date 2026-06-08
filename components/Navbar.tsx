"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="w-full border-b border-blue-950/50 bg-[#050A14]/80 backdrop-blur-md sticky top-0 z-50">
      
      {/* CONTAINER ULTRA-WIDE EXPANDIDO:
        - Mudamos de max-w-[1440px] para max-w-[1600px] para permitir que a barra se espalhe mais pelas laterais em monitores grandes.
        - Aumentamos o padding lateral (px-6 md:px-16) para dar um respiro maior perto dos cantos da tela.
      */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between">

        {/* LOGO EM IMAGEM */}
        <Link href="/" className="flex items-center cursor-default select-none transition-transform active:scale-95">
          <Image 
            src="/logo.png"          // Nome do ficheiro dentro da pasta public
            alt="WMaker's Logo" 
            width={45}              // Tamanho ideal e compacto para o ícone
            height={45}            
            className="object-contain"
            priority                // Carrega a logo com prioridade máxima
          />
        </Link>

        {/* LINKS E BOTÕES DE NAVEGAÇÃO */}
        <nav className="flex items-center gap-6 sm:gap-10 text-sm text-blue-300">
          <a href="#" className="hover:text-blue-400 transition-colors font-medium">
            Contato
          </a>
          <a href="/admin/login" className="hover:text-blue-400 transition-colors font-medium">
            Admin
          </a>

          {/* Botão de Carrinho com hover moderno */}
          <button className="p-2.5 border border-blue-900/50 rounded-xl hover:bg-blue-950/40 text-blue-400 hover:text-blue-300 transition-all hover:border-blue-800">
            <ShoppingCart size={19} />
          </button>
        </nav>

      </div>

    </header>
  )
}