"use client"

import Link from "next/link"

export default function SuccessPage() {

  return (
    <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center p-6">

      <div
        className="
          w-full
          max-w-2xl

          border border-blue-500/20
          bg-white/5
          backdrop-blur-md

          rounded-3xl

          p-8 md:p-12

          text-center
        "
      >

        {/* ICON */}
        <div
          className="
            w-24 h-24
            mx-auto

            rounded-full

            bg-green-500/20
            border border-green-500/20

            flex items-center justify-center

            text-5xl
          "
        >
          ✅
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-100 mt-8">

          Pedido Recebido!

        </h1>

        {/* DESCRIPTION */}
        <p className="text-blue-300 mt-5 text-lg leading-relaxed">

          Seu pedido foi enviado com sucesso para a WMaker's.

          <br />
          <br />

          Em breve entraremos em contato para confirmar os detalhes.

        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          {/* HOME */}
          <Link
            href="/"
            className="
              flex-1

              bg-blue-500
              hover:bg-blue-600

              transition-all

              py-4
              rounded-2xl

              text-lg
              font-semibold
            "
          >
            Voltar para Loja
          </Link>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/5583991352938"
            target="_blank"
            className="
              flex-1

              bg-green-500
              hover:bg-green-600

              transition-all

              py-4
              rounded-2xl

              text-lg
              font-semibold
            "
          >
            Abrir WhatsApp
          </a>

        </div>

      </div>

    </main>
  )
}

