'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/?status=success')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl mb-8">Thank you for your booking. Your ticket has been confirmed.</p>
      <p className="text-lg mb-4">You will be redirected to the ticket generation page shortly.</p>
      <Link href="/?status=success">
        <Button>Return to Ticket Generation</Button>
      </Link>
    </div>
  )
}