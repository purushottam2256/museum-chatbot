import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()

 
  const status = formData.get('status')
  const txnid = formData.get('txnid')
  const amount = formData.get('amount')
  const productinfo = formData.get('productinfo')
  const firstname = formData.get('firstname')
  const email = formData.get('email')
  const mihpayid = formData.get('mihpayid')


  if (status === 'success') {
    console.log('Payment successful:', { txnid, amount, productinfo, firstname, email, mihpayid })
  
    return NextResponse.redirect(new URL('/booking/success', request.url))
  } else {

    console.error('Unexpected payment status:', status)
    return NextResponse.redirect(new URL('/booking/error', request.url))
  }
}