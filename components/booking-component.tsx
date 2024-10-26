'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Language, translations } from '../lib/translations'
import { searchIndianCities, getMuseumsInCity, City, Museum } from '../lib/wikidata-api'
import Image from 'next/image'

type BookingComponentProps = {
  language: Language
  addMessage: (content: string, sender: 'user' | 'bot') => void
  onComplete: () => void
}

export const BookingComponent: React.FC<BookingComponentProps> = ({ language, addMessage }) => {
  const [step, setStep] = useState('city')
  const [bookingDetails, setBookingDetails] = useState({
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

  const t = (key: keyof typeof translations.en) => translations[language][key]

  const handleCitySearch = async (query: string) => {
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
  }

  const handleCitySelect = async (city: City) => {
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
  }

  const handleMuseumSelect = (museum: Museum) => {
    setBookingDetails(prev => ({ ...prev, museum: museum.name }))
    addMessage(museum.name, 'user')
    setMuseumInput(museum.name)
    addMessage(t('ticketCountPrompt'), 'bot')
    setStep('tickets')
  }

  const handleTicketCount = (count: number) => {
    setBookingDetails(prev => ({ ...prev, ticketCount: count }))
    addMessage(count.toString(), 'user')
    addMessage(t('detailsPrompt'), 'bot')
    setStep('details')
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMessage(t('thankYouMessage'), 'bot')
    setStep('confirm')
  }

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'mobile' && !/^\d{0,10}$/.test(value)) return
    setBookingDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleBack = () => {
    setStep(prev => {
      switch (prev) {
        case 'museum': return 'city'
        case 'tickets': return 'museum'
        case 'details': return 'tickets'
        case 'confirm': return 'details'
        case 'payment': return 'confirm'
        case 'creditCard':
        case 'debitCard':
        case 'netBanking':
        case 'upi': return 'payment'
        case 'ticket': return 'payment'
        default: return prev
      }
    })
  }

  const handleDownloadTicket = () => {
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
  }

  const renderStep = () => {
    switch (step) {
      case 'city':
        return (
          <div className="space-y-2">
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
          </div>
        )
      case 'museum':
        return (
          <div className="space-y-2">
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
          </div>
        )
      case 'tickets':
        return (
          <div className="space-y-2">
            <p>{language === 'hi' ? 'प्रति व्यक्ति टिकट 100 रुपये है' : 'Ticket per person is 100 Rs'}</p>
            <div className="flex space-x-2">
              <Button onClick={() => handleTicketCount(1)}>1</Button>
              <Button onClick={() => handleTicketCount(2)}>2</Button>
              <Button onClick={() => handleTicketCount(5)}>5</Button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (bookingDetails.ticketCount > 0) {
                handleTicketCount(bookingDetails.ticketCount);
              }
            }} className="flex space-x-2">
              <Input
                value={bookingDetails.ticketCount || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setBookingDetails(prev => ({ ...prev, ticketCount: value }));
                  }
                }}
                placeholder={t('enterTicketCount')}
                type="number"
                min="1"
              />
              <Button type="submit">{t('send')}</Button>
            </form>
          </div>
        )
      case 'details':
        return (
          <form onSubmit={handleDetailsSubmit} className="space-y-2">
            <Input 
              name="name" 
              value={bookingDetails.name} 
              onChange={(e) => {
                const value = e.target.value;
                if (!/\d/.test(value)) {
                  handleDetailsChange(e);
                }
              }} 
              placeholder={t('name')} 
              required 
            />
            <Input 
              name="age" 
              value={bookingDetails.age} 
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  handleDetailsChange(e);
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
                {['10:00 AM', '12:00 PM', '2:00 PM', '4:00PM'].map(time => {
                  const currentDate = new Date();
                  const selectedDate = new Date(bookingDetails.date);
                  const isPastTime = selectedDate.toDateString() === currentDate.toDateString() && time <= currentDate.toTimeString().slice(0, 5);
                  return !isPastTime && <SelectItem key={time} value={time}>{time}</SelectItem>;
                })}
              </SelectContent>
            </Select>
            <Input name="email" value={bookingDetails.email} onChange={handleDetailsChange} placeholder={t('email')} type="email" required />
            <Input name="mobile" value={bookingDetails.mobile} onChange={handleDetailsChange} placeholder={t('mobile')} type="tel" required />
            <p>{t('totalAmount')}: {bookingDetails.ticketCount * 100} Rs</p>
            <Button type="submit" className="w-full">{t('submitDetails')}</Button>
          </form>
        )
      case 'confirm':
        return (
          <div className="space-y-2">
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold">{t('bookingDetails')}</h3>
              <p>{t('name')}: {bookingDetails.name}</p>
              <p>{t('age')}: {bookingDetails.age}</p>
              <p>{t('preferredDate')}: {bookingDetails.date}</p>
              <p>{t('preferredTime')}: {bookingDetails.time}</p>
              <p>{t('email')}: {bookingDetails.email}</p>
              <p>{t('mobile')}: {bookingDetails.mobile}</p>
            </div>
            <Button onClick={() => setStep('payment')} className="w-full">{t('goToBillPayment')}</Button>
          </div>
        )
      case 'payment':
        return (
          <div className="space-y-2">
            <p>{t('paymentInstructions')}</p>
            <div className="space-y-2">
              <Button onClick={() => setStep('creditCard')} className="w-full">{t('creditCard')}</Button>
              <Button onClick={() => setStep('debitCard')} className="w-full">{t('debitCard')}</Button>
              <Button onClick={() => setStep('netBanking')} className="w-full">{t('netBanking')}</Button>
              <Button onClick={() => setStep('upi')} className="w-full">{t('upi')}</Button>
            </div>
          </div>
        )
      case 'creditCard':
        return (
          <form onSubmit={(e) => { e.preventDefault(); setStep('ticket'); }} className="space-y-2">
            <Input name="cardNumber" placeholder={t('cardNumber')} type="text" required />
            <Input name="cvv" placeholder={t('cvv')} type="text" required />
            <Button type="submit" className="w-full">{t('submitPayment')}</Button>
          </form>
        )
      case 'debitCard':
        return (
          <form onSubmit={(e) => { e.preventDefault(); setStep('ticket'); }} className="space-y-2">
            <Input name="cardNumber" placeholder={t('cardNumber')} type="text" required />
            <Input name="cvv" placeholder={t('cvv')} type="text" required />
            <Button type="submit" className="w-full">{t('submitPayment')}</Button>
          </form>
        )
      case 'netBanking':
        return (
          <form onSubmit={(e) => { e.preventDefault(); setStep('ticket'); }} className="space-y-2">
            <Input name="bankName" placeholder={t('bankName')} type="text" required />
            <Input name="ifscCode" placeholder={t('ifscCode')} type="text" required />
            <Button type="submit" className="w-full">{t('submitPayment')}</Button>
          </form>
        )
      case 'upi':
        return (
          <form onSubmit={(e) => { e.preventDefault(); setStep('ticket'); }} className="space-y-2">
            <Input name="upiId" placeholder={t('upiId')} type="text" required />
            <Input name="mobileNumber" placeholder={t('mobileNumber')} type="tel" required />
            <Button type="submit" className="w-full">{t('submitPayment')}</Button>
          </form>
        )
      case 'ticket':
        return (
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
              <Button onClick={handleDownloadTicket} className="w-full mt-2">{t('downloadTicket')}</Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {renderStep()}
      {step !== 'city' && (
        <Button onClick={handleBack}>
          {t('back')}
        </Button>
      )}
    </div>
  )
}