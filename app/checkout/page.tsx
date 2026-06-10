"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

import { useCart } from "@/contexts/CartContext"

export default function CheckoutPage() {

  const router = useRouter()

  const {
    cart,
    total,
    clearCart
  } = useCart()

  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")

  // =========================
  // FINALIZAR PEDIDO
  // =========================
  async function handleCheckout() {

    try {

      if (
        !name ||
        !phone ||
        !city ||
        !address
      ) {
        alert("Preencha todos os campos")
        return
      }

      if (cart.length === 0) {
        alert("Carrinho vazio")
        return
      }

      setLoading(true)

      // =========================
      // CRIA PEDIDO
      // =========================
      const {
        data: order,
        error: orderError
      } = await supabase
        .from("orders")
        .insert({
          customer_name: name,
          customer_phone: phone,
          city,
          address,
          total,
          status: "pendente"
        })
        .select()
        .single()

      if (orderError) {
        console.log(orderError)
        alert("Erro ao criar pedido")
        setLoading(false)
        return
      }

      // =========================
      // CRIA ITENS
      // =========================
      const items = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items)

      if (itemsError) {
        console.log(itemsError)
        alert("Erro ao salvar itens")
        setLoading(false)
        return
      }

      // =========================
      // WHATSAPP
      // =========================
      const productsText = cart
        .map((item) => (
          `• ${item.name} x${item.quantity}`
        ))
        .join("%0A")

      const message = `
Olá, gostaria de finalizar meu pedido:%0A%0A
${productsText}%0A%0A
Total: R$ ${total.toFixed(2)}%0A%0A
Nome: ${name}%0A
Telefone: ${phone}%0A
Cidade: ${city}%0A
Endereço: ${address}
      `

      // LIMPA CARRINHO
      clearCart()

    // REDIRECIONA WHATSAPP
    localStorage.setItem(
    "wmakers-whatsapp-message", message)
    router.push("/success")

    } catch (err) {

      console.log(err)

      alert("Erro inesperado")

    } finally {

      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050A14] text-white p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-10">

          <div>

            <h1 className="text-4xl md:text-6xl font-bold text-blue-100">
              Checkout
            </h1>

            <p className="text-blue-300 mt-3">
              Finalize seu pedido.
            </p>

          </div>

          <button
            onClick={() => router.push("/cart")}
            className="
              bg-blue-500
              hover:bg-blue-600
              transition-all
              px-6 py-3
              rounded-xl
              font-medium
            "
          >
            Voltar ao Carrinho
          </button>

        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* FORM */}
          <div
            className="
              border border-blue-500/20
              bg-white/5
              backdrop-blur-md
              rounded-3xl
              p-6
            "
          >

            <h2 className="text-2xl font-semibold mb-8">
              Dados do Cliente
            </h2>

            <div className="space-y-5">

              {/* NOME */}
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full
                  bg-[#0A1324]
                  border border-blue-500/20
                  rounded-2xl
                  px-4 py-4
                  outline-none
                  focus:border-blue-500
                "
              />

              {/* TELEFONE */}
              <input
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
                  w-full
                  bg-[#0A1324]
                  border border-blue-500/20
                  rounded-2xl
                  px-4 py-4
                  outline-none
                  focus:border-blue-500
                "
              />

              {/* CIDADE */}
              <input
                type="text"
                placeholder="Cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="
                  w-full
                  bg-[#0A1324]
                  border border-blue-500/20
                  rounded-2xl
                  px-4 py-4
                  outline-none
                  focus:border-blue-500
                "
              />

              {/* ENDEREÇO */}
              <textarea
                placeholder="Endereço completo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="
                  w-full
                  h-36
                  resize-none
                  bg-[#0A1324]
                  border border-blue-500/20
                  rounded-2xl
                  px-4 py-4
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>

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
              Resumo
            </h2>

            <div className="mt-6 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between gap-4 text-blue-200"
                >

                  <span>
                    {item.name} x{item.quantity}
                  </span>

                  <span>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>

                </div>

              ))}

            </div>

            {/* TOTAL */}
            <div className="mt-8 pt-6 border-t border-blue-500/10">

              <div className="flex justify-between items-center">

                <span className="text-lg">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-300">
                  R$ {total.toFixed(2)}
                </span>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="
                mt-8
                w-full
                bg-blue-500
                hover:bg-blue-600
                disabled:opacity-50
                transition-all
                py-4
                rounded-2xl
                text-lg
                font-semibold
              "
            >

              {loading
                ? "Finalizando..."
                : "Finalizar Pedido"
              }

            </button>

          </div>

        </div>

      </div>

    </main>
  )
}

