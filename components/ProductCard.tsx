type ProductCardProps = {
  name: string
  price: number
  image: string
}

export function ProductCard({
  name,
  price,
  image
}: ProductCardProps) {
  return (
    <div className="group">
      
      <div className="bg-slate-950 rounded-3xl overflow-hidden transition hover:scale-[1.02] border border-blue-900">

        <div className="overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-80 object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">

          <h2 className="text-xl font-semibold">
            {name}
          </h2>

          <p className="text-zinc-500 mt-2">
            R$ {price}
          </p>

          <button className="mt-5 w-full bg-white text-black py-3 rounded-2xl">
            Adicionar ao Carrinho
          </button>

        </div>

      </div>

    </div>
  )
}