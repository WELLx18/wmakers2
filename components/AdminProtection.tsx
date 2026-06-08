"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

export function AdminProtection({
  children
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function checkUser() {

      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/admin/login")
        return
      }

      setLoading(false)
    }

    checkUser()

  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Carregando...
      </main>
    )
  }

  return children
}