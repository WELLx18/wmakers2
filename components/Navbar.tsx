"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="border-b border-blue-950 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO AJUSTADA */}
        <Link href="/" className="flex items-center cursor-default">
          <Image 
            src="/logo.png"          
            alt="WMaker's Logo" 
            width={45}             
            height={45}            
            className="object-contain"
          />
        </Link>

        <nav className="flex items-center gap-8 text-sm text-blue-300">
          <a href="#" className="hover:text-blue-400 transition-colors">Contato</a>
          <a href="/admin/login" className="hover:text-blue-400 transition-colors">Admin</a>

          <button className="p-2 border border-blue-900 rounded-xl hover:bg-blue-950/50 text-blue-400 transition-colors">
            <ShoppingCart size={20} />
          </button>
        </nav>

      </div>

    </header>
  )
}