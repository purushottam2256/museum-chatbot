'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle } from 'lucide-react'
import BookingComponent from './booking-component'
import { EventsComponent } from './events-component'
import { GalleryComponent } from './gallery-component'
import { LearningOutreachComponent } from './learning-outreach-component'
import { IndianCultureComponent } from './indian-culture-component'
import { Language, useTranslations } from '../lib/translations'


type Message = {
  sender: 'user' | 'bot'
  content: string
}

export const Main =() => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState('language')
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', content: 'Hi there! Select a preferred language:' }
  ])
  const [language, setLanguage] = useState<Language>('en')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && hasBeenClosed) {
      setCurrentStep('language')
      setMessages([{ sender: 'bot', content: 'Hi there! Select a preferred language:' }])
      setLanguage('en')
      setHasBeenClosed(false)
    }
  }, [isOpen, hasBeenClosed])

  const t = useTranslations(language)

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, { content, sender }])
  }

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    addMessage(lang === 'en' ? 'English' : 'हिंदी', 'user')
    addMessage(t('mainMenuPrompt'), 'bot')
    setCurrentStep('main')
  }

  const handleMainOption = (option: string) => {
    addMessage(option, 'user')
    if (option === t('bookingTickets')) {
      setCurrentStep('booking')
    } else if (option === t('events')) {
      setCurrentStep('events')
    } else if (option === t('gallery')) {
      setCurrentStep('gallery')
    } else if (option === t('learning')) {
      setCurrentStep('learning')
    } else if (option === t('culture')) {
      setCurrentStep('culture')
    } else if (option === t('goBack')) {
      setCurrentStep('language')
      addMessage(t('welcomeMessage'), 'bot')
    } else {
      addMessage(`${t('helpMessage')} ${option}`, 'bot')
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setHasBeenClosed(true)
  }

  const renderContent = () => {
    switch (currentStep) {
      case 'language':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => handleLanguageSelect('en')}>English</Button>
            <Button onClick={() => handleLanguageSelect('hi')}>हिंदी</Button>
          </div>
        )
      case 'main':
        return (
          <div className="space-y-2">
            <Button onClick={() => handleMainOption(t('bookingTickets'))} className="w-full">{t('bookingTickets')}</Button>
            <Button onClick={() => handleMainOption(t('events'))} className="w-full">{t('events')}</Button>
            <Button onClick={() => handleMainOption(t('gallery'))} className="w-full">{t('gallery')}</Button>
            <Button onClick={() => handleMainOption(t('learning'))} className="w-full">{t('learning')}</Button>
            <Button onClick={() => handleMainOption(t('culture'))} className="w-full">{t('culture')}</Button>
            <Button onClick={() => handleMainOption(t('goBack'))} className="w-full">{t('goBack')}</Button>
          </div>
        )
      case 'booking':
        return <BookingComponent
          language={language} 
          onComplete={() => setCurrentStep('main')} 
          addMessage={addMessage}
        />
      case 'events':
        return <EventsComponent language={language} onBack={() => setCurrentStep('main')} />
      case 'gallery':
        return <GalleryComponent language={language} onBack={() => setCurrentStep('main')} />
      case 'learning':
        return <LearningOutreachComponent language={language} onBack={() => setCurrentStep('main')} />
      case 'culture':
        return <IndianCultureComponent language={language} onBack={() => setCurrentStep('main')} />
      default:
        return null
    }
  }

  return (
    <div className="fixed bottom-4 right-4">
      <Button onClick={() => setIsOpen(true)} className="rounded-full p-4">
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-6">
            <DialogTitle>Vedan Chatbot</DialogTitle>
            <DialogDescription>
              {t('helpMessage')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-end space-x-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar>
                    <AvatarFallback>{message.sender === 'user' ? 'U' : 'V'}</AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-2 max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-6 bg-background">
            <div className="space-y-4">
              {renderContent()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}