"use client"

import { useRouter } from "next/navigation"

import { useCart } from "@/contexts/CartContext"

export default function CartPage() {

  const router = useRouter()

  const {
    cart,
    total,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart()

  return (
    <main className="min-h-screen bg-[#050A14] text-white p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-10">

          <div>

            <h1 className="text-4xl md:text-6xl font-bold text-blue-100">
              Carrinho
            </h1>

            <p className="text-blue-300 mt-3">
              Revise seus produtos antes de finalizar.
            </p>

          </div>

          <button
            onClick={() => router.push("/")}
            className="
              bg-blue-500
              hover:bg-blue-600
              transition-all
              px-6 py-3
              rounded-xl
              font-medium
            "
          >
            Continuar Comprando
          </button>

        </div>

        {/* EMPTY */}
        {cart.length === 0 && (

          <div
            className="
              border border-blue-500/20
              bg-white/5
              backdrop-blur-md
              rounded-3xl
              p-10
              text-center
            "
          >

            <h2 className="text-2xl font-semibold">
              Seu carrinho está vazio
            </h2>

            <p className="text-blue-300 mt-3">
              Adicione produtos para continuar.
            </p>

          </div>

        )}

        {/* CONTENT */}
        {cart.length > 0 && (

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">

            {/* PRODUTOS */}
            <div className="space-y-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="
                    border border-blue-500/20
                    bg-white/5
                    backdrop-blur-md
                    rounded-3xl
                    p-5

                    flex flex-col md:flex-row
                    gap-5
                  "
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full md:w-44
                      h-44
                      object-cover
                      rounded-2xl
                    "
                  />

                  {/* INFO */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="text-blue-300 mt-3">
                        R$ {item.price.toFixed(2)}
                      </p>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between gap-4 mt-6 flex-wrap">

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3">

                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="
                            w-10 h-10
                            rounded-xl
                            bg-blue-500/20
                            border border-blue-500/20
                            text-xl
                          "
                        >
                          -
                        </button>

                        <span className="text-lg font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="
                            w-10 h-10
                            rounded-xl
                            bg-blue-500/20
                            border border-blue-500/20
                            text-xl
                          "
                        >
                          +
                        </button>

                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="
                          bg-red-500/20
                          border border-red-500/20
                          text-red-300
                          px-4 py-2
                          rounded-xl
                          hover:bg-red-500/30
                          transition-all
                        "
                      >
                        Remover
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* RESUMO */}
            <div
              className="
                h-fit
                sticky top-6

                border border-blue-500/20
                bg-white/5
                backdrop-blur-md
                rounded-3xl
                p-6
              "
            >

              <h2 className="text-2xl font-semibold">
                Resumo do Pedido
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-blue-200">

                  <span>
                    Produtos
                  </span>

                  <span>
                    {cart.length}
                  </span>

                </div>

                <div className="flex justify-between text-blue-200">

                  <span>
                    Total
                  </span>

                  <span className="text-green-300 font-semibold text-lg">
                    R$ {total.toFixed(2)}
                  </span>

                </div>

              </div>

              {/* FINALIZAR */}
              <button
                onClick={() => router.push("/checkout")}
                className="
                  mt-8
                  w-full
                  bg-blue-500
                  hover:bg-blue-600
                  transition-all
                  py-4
                  rounded-2xl
                  text-lg
                  font-semibold
                "
              >
                Finalizar Pedido
              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  )
}

