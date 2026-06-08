const categories = [
  "Articulados",
  "Geek",
  "Decoração",
  "Personalizados"
]

export function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-4xl font-bold">
          Categorias
        </h2>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {categories.map((category) => (
          <button
            key={category}
            className="bg-slate-950 rounded-3xl py-10 text-xl font-medium border border-blue-900"
          >
            {category}
          </button>
        ))}

      </div>

    </section>
  )
}