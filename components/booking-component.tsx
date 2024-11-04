'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Language, translations } from '../lib/translations'
import { searchIndianCities, getMuseumsInCity, City, Museum } from '../lib/wikidata-api'
import Image from 'next/image'
import { ArrowLeft, Download } from 'lucide-react'

type BookingComponentProps = {
  language: Language
  addMessage: (content: string, sender: 'user' | 'bot') => void
  onComplete: () => void
}

type PayuConfig = {
  merchantKey: string
  salt: string
}

type BookingDetails = {
  city: string
  museum: string
  ticketCount: number
  name: string
  age: string
  date: string
  time: string
  email: string
  mobile: string
}

export default function Component({ language = 'en', addMessage = () => {}, onComplete = () => {} }: BookingComponentProps) {
  const [step, setStep] = useState<'city' | 'museum' | 'tickets' | 'details' | 'confirm' | 'payment' | 'ticket'>('city')
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    city: '',
    museum: '',
    ticketCount: 0,
    name: '',
    age: '',
    date: '',
    time: '',
    email: '',
    mobile: ''
  })
  const [citySuggestions, setCitySuggestions] = useState<City[]>([])
  const [museums, setMuseums] = useState<Museum[]>([])
  const [cityInput, setCityInput] = useState('')
  const [museumInput, setMuseumInput] = useState('')
  const [payuConfig, setPayuConfig] = useState<PayuConfig | null>(null)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)

  const t = useCallback((key: keyof typeof translations.en) => translations[language][key], [language])

  useEffect(() => {
    const fetchPayuConfig = async () => {
      try {
        const response = await fetch('/api/payu-config')
        const config = await response.json()
        setPayuConfig(config)
      } catch (error) {
        console.error('Error fetching PayU config:', error)
        addMessage(t('errorInitializingPayment'), 'bot')
      }
    }

    fetchPayuConfig()
  }, [addMessage, t])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const payuStatus = urlParams.get('status')
    if (payuStatus === 'success') {
      addMessage(t('paymentSuccessful'), 'bot')
      setStep('ticket')
      onComplete()
    } else if (payuStatus === 'failure') {
      addMessage(t('paymentFailed'), 'bot')
      setStep('payment')
    }
  }, [addMessage, t, onComplete])

  const handleCitySearch = useCallback(async (query: string) => {
    setCityInput(query)
    if (query.length > 2) {
      try {
        const results = await searchIndianCities(query)
        setCitySuggestions(results.slice(0, 3))
      } catch (error) {
        console.error('Error searching cities:', error)
        addMessage(t('errorSearchingCities'), 'bot')
      }
    } else {
      setCitySuggestions([])
    }
  }, [addMessage, t])

  const handleCitySelect = useCallback(async (city: City) => {
    setBookingDetails(prev => ({ ...prev, city: city.label }))
    addMessage(city.label, 'user')
    setCityInput(city.label)
    setCitySuggestions([])
    try {
      const museumResults = await getMuseumsInCity(city.id)
      setMuseums(museumResults.slice(0, 5))
      if (museumResults.length > 0) {
        const museumList = museumResults.slice(0, 5).map((museum, index) => `${index + 1}. ${museum.name}`).join('\n')
        addMessage(`${t('museumPrompt')}\n${museumList}`, 'bot')
      } else {
        addMessage(t('noMuseumsFound'), 'bot')
      }
      setStep('museum')
    } catch (error) {
      console.error('Error fetching museums:', error)
      addMessage(t('errorFetchingMuseums'), 'bot')
    }
  }, [addMessage, t])

  const handleMuseumSelect = useCallback((museum: Museum) => {
    setBookingDetails(prev => ({ ...prev, museum: museum.name }))
    addMessage(museum.name, 'user')
    setMuseumInput(museum.name)
    addMessage(t('ticketCountPrompt'), 'bot')
    setStep('tickets')
  }, [addMessage, t])

  const handleTicketCount = useCallback((count: number) => {
    setBookingDetails(prev => ({ ...prev, ticketCount: count }))
    addMessage(count.toString(), 'user')
    addMessage(t('detailsPrompt'), 'bot')
    setStep('details')
  }, [addMessage, t])

  const handleDetailsSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    addMessage(t('thankYouMessage'), 'bot')
    setStep('confirm')
  }, [addMessage, t])

  const handleDetailsChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'mobile' && !/^\d{0,10}$/.test(value)) return
    setBookingDetails(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleBack = useCallback(() => {
    setStep(prev => {
      switch (prev) {
        case 'museum': return 'city'
        case 'tickets': return 'museum'
        case 'details': return 'tickets'
        case 'confirm': return 'details'
        case 'payment': return 'confirm'
        default: return prev
      }
    })
  }, [])

  const handleDownloadTicket = useCallback(() => {
    const ticketContent = `
      Booking Details:
      Name: ${bookingDetails.name}
      Age: ${bookingDetails.age}
      Date: ${bookingDetails.date}
      Time: ${bookingDetails.time}
      Email: ${bookingDetails.email}
      Mobile: ${bookingDetails.mobile}
      City: ${bookingDetails.city}
      Museum: ${bookingDetails.museum}
      Ticket Count: ${bookingDetails.ticketCount}
      Total Amount: ${bookingDetails.ticketCount * 100} Rs
    `.trim()

    const blob = new Blob([ticketContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'museum_ticket.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [bookingDetails])

  const initiatePayuPayment = useCallback(async () => {
    if (!payuConfig) {
      addMessage(t('paymentNotInitialized'), 'bot')
      return
    }

    setIsPaymentProcessing(true)

    const { merchantKey, salt } = payuConfig
    const txnid = `TXN${Date.now()}`
    const amount = bookingDetails.ticketCount * 100
    const productinfo = `Museum Ticket - ${bookingDetails.museum}`
    const firstname = bookingDetails.name
    const email = bookingDetails.email
    const phone = bookingDetails.mobile
    const surl = `${window.location.origin}/booking/success`
    const furl = `${window.location.origin}/booking/failure`

    // Generate hash
    const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`
    const hash = await generateHash(hashString)

    // Create form and submit
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://test.payu.in/_payment' // Use the appropriate PayU URL

    const params = {
      key: merchantKey,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      hash,
    }

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input')
        hiddenField.type = 'hidden'
        hiddenField.name = key
        hiddenField.value = String(params[key as keyof typeof params])
        form.appendChild(hiddenField)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }, [addMessage, bookingDetails, payuConfig, t])

  const generateHash = async (string: string) => {
    const msgBuffer = new TextEncoder().encode(string)
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const renderStep = () => {
    switch (step) {
      case 'city':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('selectCity')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {citySuggestions.map((city) => (
                <Button
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left"
                >
                  {city.label}
                </Button>
              ))}
              <Input
                value={cityInput}
                onChange={(e) => handleCitySearch(e.target.value)}
                placeholder={t('searchCity')}
              />
            </CardContent>
          </Card>
        )
      case 'museum':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('selectMuseum')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {museums
                .filter(museum => museum.name.toLowerCase().includes(museumInput.toLowerCase()))
                .map((museum) => (
                  <Button
                    key={museum.id}
                    onClick={() => handleMuseumSelect(museum)}
                    className="w-full text-left"
                  >
                    {museum.name}
                  </Button>
                ))}
              <div className="flex items-center">
                <Input
                  value={museumInput}
                  onChange={(e) => setMuseumInput(e.target.value)}
                  placeholder={t('searchMuseum')}
                  className="flex-grow"
                />
                <Button onClick={() => handleMuseumSelect({ id: 'custom', name: museumInput })} className="ml-2">
                  {t('send')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      case 'tickets':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('selectTickets')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{language === 'hi' ? 'प्रति व्यक्ति टिकट 100 रुपये है' : 'Ticket per person is 100 Rs'}</p>
              <div className="flex space-x-2">
                <Button onClick={() => handleTicketCount(1)}>1</Button>
                <Button onClick={() => handleTicketCount(2)}>2</Button>
                <Button onClick={() => handleTicketCount(5)}>5</Button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault()
                if (bookingDetails.ticketCount > 0) {
                  handleTicketCount(bookingDetails.ticketCount)
                }
              }} className="flex space-x-2">
                <Input
                  value={bookingDetails.ticketCount || ''}
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    if (!isNaN(value) && value >= 0) {
                      setBookingDetails(prev => ({ ...prev, ticketCount: value }))
                    }
                  }}
                  placeholder={t('enterTicketCount')}
                  type="number"
                  min="1"
                />
                <Button type="submit">{t('send')}</Button>
              </form>
            </CardContent>
          </Card>
        )
      case 'details':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('enterDetails')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailsSubmit} className="space-y-2">
                <Input 
                  name="name" 
                  value={bookingDetails.name} 
                  onChange={(e) => {
                    const value = e.target.value
                    if (!/\d/.test(value)) {
                      handleDetailsChange(e)
                    }
                  }} 
                  placeholder={t('name')} 
                  required 
                />
                <Input 
                  name="age" 
                  value={bookingDetails.age} 
                  onChange={(e) => {
                    const value = e.target.value
                    if (/^\d*$/.test(value)) {
                      handleDetailsChange(e)
                    }
                  }} 
                  placeholder={t('age')} 
                  required 
                />
                <Input 
                  name="date" 
                  value={bookingDetails.date} 
                  onChange={handleDetailsChange} 
                  placeholder={t('preferredDate')} 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]} 
                  required 
                />
                <Select 
                  name="time" 
                  value={bookingDetails.time} 
                  onValueChange={(value) => handleDetailsChange({ target: { name: 'time', value } } as React.ChangeEvent<HTMLSelectElement>)} 
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('preferredTime')} />
                  </SelectTrigger>
                  <SelectContent>
                    {['10:00 AM', '12:00 PM', '2:00  PM', '4:00  PM'].map(time => {
                      const currentDate = new Date()
                      const selectedDate = new Date(bookingDetails.date)
                      const isPastTime = selectedDate.toDateString() === currentDate.toDateString() && time <= currentDate.toTimeString().slice(0, 5)
                      return !isPastTime && <SelectItem key={time} value={time}>{time}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <Input name="email" value={bookingDetails.email} onChange={handleDetailsChange} placeholder={t('email')} type="email" required />
                <Input name="mobile" value={bookingDetails.mobile} onChange={handleDetailsChange} placeholder={t('mobile')} type="tel" required />
                <p>{t('totalAmount')}: {bookingDetails.ticketCount * 100} Rs</p>
                <Button type="submit" className="w-full">{t('submitDetails')}</Button>
              </form>
            </CardContent>
          </Card>
        )
      case 'confirm':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('confirmBooking')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold">{t('bookingDetails')}</h3>
                <p>{t('name')}: {bookingDetails.name}</p>
                <p>{t('age')}: {bookingDetails.age}</p>
                <p>{t('preferredDate')}: {bookingDetails.date}</p>
                <p>{t('preferredTime')}: {bookingDetails.time}</p>
                <p>{t('email')}: {bookingDetails.email}</p>
                <p>{t('mobile')}: {bookingDetails.mobile}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep('payment')} className="w-full">{t('proceedToPayment')}</Button>
            </CardFooter>
          </Card>
        )
      case 'payment':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('payment')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{t('paymentInstructions')}</p>
              <Button 
                onClick={initiatePayuPayment} 
                className="w-full" 
                disabled={isPaymentProcessing}
              >
                {isPaymentProcessing ? t('processingPayment') : t('proceedToPayment')}
              </Button>
              {isPaymentProcessing && (
                <p className="text-center text-sm text-muted-foreground">{t('redirecting')}</p>
              )}
            </CardContent>
          </Card>
        )
      case 'ticket':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('yourTicket')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="border p-4 rounded-lg w-1/2">
                  <h3 className="font-bold">{t('bookingDetails')}</h3>
                  <p>{t('name')}: {bookingDetails.name}</p>
                  <p>{t('age')}: {bookingDetails.age}</p>
                  <p>{t('preferredDate')}: {bookingDetails.date}</p>
                  <p>{t('preferredTime')}: {bookingDetails.time}</p>
                  <p>{t('email')}: {bookingDetails.email}</p>
                  <p>{t('mobile')}: {bookingDetails.mobile}</p>
                </div>
                <div className="border p-4 rounded-lg w-1/2">
                  <h3 className="font-bold">{t('qrCode')}</h3>
                  <div className="flex justify-center">
                    <Image src="/placeholder.svg" alt="QR Code" width={200} height={200} />
                  </div>
                </div>
              </div>
              <Button onClick={handleDownloadTicket} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                {t('downloadTicket')}
              </Button>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {renderStep()}
      {step !== 'city' && step !== 'payment' && step !== 'ticket' && (
        <Button onClick={handleBack} variant="outline" className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>
      )}
    </div>
  )
}