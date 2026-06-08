"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
return (

  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">

    <Link href="/" className="flex items-center cursor-default select-none transition-transform active:scale-95">
      <Image 
        src="/logo.png"
        alt="WMaker's Logo" 
        width={45}
        height={45}
        className="object-contain"
        priority
      />
    </Link>

    <nav className="flex items-center gap-6 sm:gap-10 text-sm text-blue-300">
      <a href="#" className="hover:text-blue-400 transition-colors font-medium">
        Contato
      </a>
      <a href="/admin/login" className="hover:text-blue-400 transition-colors font-medium">
        Admin
      </a>

      <button className="p-2.5 border border-blue-900/50 rounded-xl hover:bg-blue-950/40 text-blue-400 hover:text-blue-300 transition-all hover:border-blue-800">
        <ShoppingCart size={19} />
      </button>
    </nav>

  </div>
)
}