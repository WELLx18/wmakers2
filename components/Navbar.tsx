"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="w-full border-b border-blue-950/50 bg-[#050A14]/80 backdrop-blur-md sticky top-0 z-50">
      
      {/* CONTAINER ALINHADO:
        - Usando max-w-[1440px] para limitar a largura igual ao conteúdo da página.
        - Usando px-4 e md:px-10 para manter o mesmo recuo nas laterais em qualquer tamanho de tela.
      */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-4 flex items-center justify-between">

        {/* LOGO EM IMAGEM (Ponteiro de mouse padrão e sem opacidade, como você pediu) */}
        <Link href="/" className="flex items-center cursor-default select-none">
          <Image 
            src="/logo.png"          // Nome do arquivo dentro da pasta public
            alt="WMaker's Logo" 
            width={45}              // Tamanho perfeito e discreto
            height={45}            
            className="object-contain"
            priority                // Carrega a logo com prioridade por estar no topo da dobra
          />
        </Link>

        {/* LINKS E BOTÕES DE NAVEGAÇÃO */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm text-blue-300">
          <a href="#" className="hover:text-blue-400 transition-colors font-medium">
            Contato
          </a>
          <a href="/admin/login" className="hover:text-blue-400 transition-colors font-medium">
            Admin
          </a>

          {/* Botão de Carrinho com hover discreto */}
          <button className="p-2.5 border border-blue-900/50 rounded-xl hover:bg-blue-950/40 text-blue-400 hover:text-blue-300 transition-all">
            <ShoppingCart size={19} />
          </button>
        </nav>

      </div>

    </header>
  )
}