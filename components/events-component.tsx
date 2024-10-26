'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Language, translations } from '../lib/translations'

interface EventsComponentProps {
  language: Language
  onBack: () => void
}

export function EventsComponent({ language, onBack }: EventsComponentProps) {
  const t = (key: keyof typeof translations.en) => translations[language][key]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('events')}</h2>
      <p>{t('eventsDescription')}</p>
      {/* Add events listing here */}
      <Button onClick={onBack}>{t('back')}</Button>
    </div>
  )
}