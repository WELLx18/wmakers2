"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextData {

  cart: CartItem[]

  addToCart: (product: CartItem) => void

  removeFromCart: (id: string) => void

  increaseQuantity: (id: string) => void

  decreaseQuantity: (id: string) => void

  clearCart: () => void

  total: number
}

const CartContext = createContext({} as CartContextData)

export function CartProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [cart, setCart] = useState<CartItem[]>([])

  // LOAD STORAGE
  useEffect(() => {

    const storedCart = localStorage.getItem("wmakers-cart")

    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }

  }, [])

  // SAVE STORAGE
  useEffect(() => {

    localStorage.setItem(
      "wmakers-cart",
      JSON.stringify(cart)
    )

  }, [cart])

  // ADD
  function addToCart(product: CartItem) {

    setCart((prev) => {

      const exists = prev.find(
        (item) => item.id === product.id
      )

      if (exists) {

        return prev.map((item) =>

          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1
        }
      ]
    })
  }

  // REMOVE
  function removeFromCart(id: string) {

    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  // INCREASE
  function increaseQuantity(id: string) {

    setCart((prev) =>
      prev.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }

  // DECREASE
  function decreaseQuantity(id: string) {

    setCart((prev) =>
      prev.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1
            }
          : item
      )
    )
  }

  // CLEAR
  function clearCart() {

    setCart([])
  }

  // TOTAL
  const total = cart.reduce((acc, item) => {

    return acc + item.price * item.quantity

  }, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {

  return useContext(CartContext)
}

