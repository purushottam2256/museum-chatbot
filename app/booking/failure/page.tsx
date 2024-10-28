'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function FailurePage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/?status=failure')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
      <p className="text-xl mb-8">We&apos;re sorry, but there was an issue processing your payment.</p>
      <p className="text-lg mb-4">You will be redirected to the payment page shortly.</p>
      <Link href="/?status=failure">
        <Button>Return to Payment</Button>
      </Link>
    </div>
  )
}