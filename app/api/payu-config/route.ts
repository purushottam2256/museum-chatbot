import { NextResponse } from 'next/server'

export async function GET() {
  const merchantKey = process.env.PAYU_MERCHANT_KEY
  const salt = process.env.PAYU_SALT

  if (!merchantKey || !salt) {
    return NextResponse.json({ error: 'PayU configuration not found' }, { status: 500 })
  }

  return NextResponse.json({ merchantKey, salt })
}