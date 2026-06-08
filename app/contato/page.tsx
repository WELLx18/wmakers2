"use client"

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function Contato() {
return (

    <main className="min-h-screen bg-[#050A14] text-white w-full overflow-x-hidden">
        <Navbar />
        <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
        
        <div className="max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Fale <span className="text-blue-500 italic">Conosco</span>
            </h1>
            <p className="text-blue-200 mt-4 text-sm sm:text-base">
            Escolha uma das opções abaixo para entrar em contato ou fazer seu orçamento.
            </p>
        </div>

        {/* Links de contato diretos e estilizados com o fundo do site */}
        <div className="max-w-md mx-auto space-y-4">
            
            <a 
                href="https://wa.me/5583991352938" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-5 border border-blue-900 bg-[#0A1324] rounded-xl text-blue-100 hover:border-blue-500 transition-all font-medium text-lg"
            >
                Whatsapp
            </a>

            <a 
            href="https://instagram.com/"
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-5 border border-blue-900 bg-[#0A1324] rounded-xl text-blue-100 hover:border-blue-500 transition-all font-medium text-lg"
            >
            Seguir no Instagram
            </a>

        </div>

        {/* Informações adicionais simples */}
        <div className="max-w-md mx-auto mt-12 p-6 border border-blue-950/50 bg-[#0A1324]/40 rounded-xl text-sm text-blue-300">
            <p className="font-semibold text-blue-100 mb-2">Email para contato:</p>
            <p>contato@wmakers.com</p>
        </div>

        </section>
        <Footer />
    </main>
  )
}