"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

interface Order {
  id: string
  customer_name: string
  customer_phone: string
  city: string
  address: string
  total: number
  status: string
  created_at: string

  order_items: {
    id: string
    quantity: number
    price: number

    products: {
      id: string
      name: string
      image_url: string
    }
  }[]
}

export default function OrdersPage() {

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // =========================
  // LOAD ORDERS
  // =========================
  useEffect(() => {

    loadOrders()

  }, [])

  async function loadOrders() {

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          products (
            id,
            name,
            image_url
          )
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setOrders(data || [])
    setLoading(false)
  }

  // =========================
  // UPDATE STATUS
  // =========================
  async function updateStatus(
    orderId: string,
    status: string
  ) {

    const { error } = await supabase
      .from("orders")
      .update({
        status
      })
      .eq("id", orderId)

    if (error) {
      console.log(error)
      alert("Erro ao atualizar status")
      return
    }

    loadOrders()
  }

  // =========================
  // DELETE ORDER
  // =========================
  async function deleteOrder(id: string) {

    const confirmDelete = confirm(
      "Deseja deletar este pedido?"
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id)

    if (error) {
      console.log(error)
      alert("Erro ao deletar pedido")
      return
    }

    loadOrders()
  }

  // =========================
  // STATUS COLOR
  // =========================
  function getStatusColor(status: string) {

    switch (status) {

      case "pendente":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/20"

      case "confirmado":
        return "bg-blue-500/20 text-blue-300 border-blue-500/20"

      case "produzindo":
        return "bg-purple-500/20 text-purple-300 border-purple-500/20"

      case "enviado":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/20"

      case "finalizado":
        return "bg-green-500/20 text-green-300 border-green-500/20"

      case "cancelado":
        return "bg-red-500/20 text-red-300 border-red-500/20"

      default:
        return "bg-zinc-500/20 text-zinc-300 border-zinc-500/20"
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center">

        <p className="text-blue-300">
          Carregando pedidos...
        </p>

      </main>
    )
  }

  // =========================
  // PAGE
  // =========================
  return (
    <main className="min-h-screen bg-[#050A14] text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">

        <div className="flex items-center justify-between gap-4 flex-wrap">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold text-blue-100">
              Pedidos
            </h1>

            <p className="text-blue-300 mt-2">
              Gerencie os pedidos da WMaker's.
            </p>

          </div>

          <a
            href="/admin/dashboard"
            className="
              bg-blue-500
              hover:bg-blue-600
              transition-all
              px-6 py-3
              rounded-xl
              font-medium
              text-white
            "
          >
            Voltar ao Dashboard
          </a>

        </div>

      </div>

      {/* EMPTY */}
      {orders.length === 0 && (

        <div
          className="
            border border-blue-500/20
            bg-white/5
            backdrop-blur-md
            rounded-2xl
            p-10
            text-center
          "
        >

          <p className="text-blue-300">
            Nenhum pedido encontrado.
          </p>

        </div>

      )}

      {/* ORDERS */}
      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="
              border border-blue-500/20
              bg-white/5
              backdrop-blur-md
              rounded-2xl
              p-6
            "
          >

            {/* TOP */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* INFO */}
              <div>

                <div className="flex items-center gap-3 flex-wrap">

                  <h2 className="text-2xl font-semibold">
                    {order.customer_name}
                  </h2>

                  <span
                    className={`
                      px-3 py-1
                      rounded-full
                      border
                      text-sm
                      ${getStatusColor(order.status)}
                    `}
                  >
                    {order.status}
                  </span>

                </div>

                <div className="mt-4 space-y-2 text-blue-200">

                  <p>
                    📞 {order.customer_phone}
                  </p>

                  <p>
                    📍 {order.city}
                  </p>

                  <p>
                    🏠 {order.address}
                  </p>

                  <p className="text-green-300 font-semibold mt-4">
                    Total: R$ {Number(order.total).toFixed(2)}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3 min-w-[220px]">

                {/* STATUS */}
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.id, e.target.value)
                  }
                  className="
                    bg-[#0A1324]
                    border border-blue-500/20
                    rounded-xl
                    px-4 py-3
                    outline-none
                  "
                >

                  <option value="pendente">
                    Pendente
                  </option>

                  <option value="confirmado">
                    Confirmado
                  </option>

                  <option value="produzindo">
                    Produzindo
                  </option>

                  <option value="enviado">
                    Enviado
                  </option>

                  <option value="finalizado">
                    Finalizado
                  </option>

                  <option value="cancelado">
                    Cancelado
                  </option>

                </select>

                {/* DELETE */}
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="
                    bg-red-500/20
                    border border-red-500/20
                    text-red-300
                    py-3
                    rounded-xl
                    hover:bg-red-500/30
                    transition-all
                  "
                >
                  Deletar Pedido
                </button>

              </div>

            </div>

            {/* PRODUTOS */}
            <div className="mt-8 pt-6 border-t border-blue-500/10">

              <h3 className="text-lg font-semibold mb-5 text-blue-100">
                Produtos do Pedido
              </h3>

              <div className="space-y-4">

                {order.order_items?.map((item) => (

                  <div
                    key={item.id}
                    className="
                      flex items-center justify-between
                      gap-4
                      bg-[#0A1324]
                      border border-blue-500/10
                      rounded-2xl
                      p-4
                    "
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src={item.products?.image_url}
                        alt={item.products?.name}
                        className="
                          w-16 h-16
                          rounded-xl
                          object-cover
                        "
                      />

                      <div>

                        <h4 className="font-medium">
                          {item.products?.name}
                        </h4>

                        <p className="text-blue-300 text-sm mt-1">
                          Quantidade: {item.quantity}
                        </p>

                      </div>

                    </div>

                    <div className="text-green-300 font-semibold">

                      R$
                      {" "}
                      {(item.price * item.quantity).toFixed(2)}

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* FOOTER */}
            <div className="mt-6 pt-4 border-t border-blue-500/10 text-sm text-blue-400">

              Pedido criado em:
              {" "}
              {new Date(order.created_at).toLocaleString("pt-BR")}

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}