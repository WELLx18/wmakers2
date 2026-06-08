export function Footer() {
  return (
    <footer className="border-t border-zinc-200 mt-24">
      
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          <div>
            <h2 className="text-2xl font-bold">
              WMaker's
            </h2>

            <p className="text-zinc-500 mt-3 max-w-md">
              Impressões 3D premium com acabamento profissional para decoração, peças articuladas e projetos personalizados.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-zinc-500">

            <a
              href="#"
              className="hover:text-black transition"
            >
              Produtos
            </a>

            <a
              href="#"
              className="hover:text-black transition"
            >
              Categorias
            </a>

            <a
              href="#"
              className="hover:text-black transition"
            >
              Contato
            </a>

          </div>

        </div>

        <div className="border-t border-zinc-200 mt-10 pt-6 text-sm text-zinc-400">

          © 2026 WMaker's 3D. Todos os direitos reservados.

        </div>

      </div>

    </footer>
  )
}