import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()

  const txnid = formData.get('txnid')
  const amount = formData.get('amount')
  const productinfo = formData.get('productinfo')
  const firstname = formData.get('firstname')
  const email = formData.get('email')
  const error_Message = formData.get('error_Message')


  console.log('Payment failed:', { txnid, amount, productinfo, firstname, email, error_Message })
  return NextResponse.redirect(new URL('/booking/failure', request.url))
}