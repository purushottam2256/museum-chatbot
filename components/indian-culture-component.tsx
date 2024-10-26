'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Language, translations } from '../lib/translations'

interface IndianCultureComponentProps {
  language: Language
  onBack: () => void
}

export function IndianCultureComponent({ language, onBack }: IndianCultureComponentProps) {
  const t = (key: keyof typeof translations.en) => translations[language][key]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('culture')}</h2>
      <p>{t('cultureDescription')}</p>
      {/* Add Indian culture content here */}
      <Button onClick={onBack}>{t('back')}</Button>
    </div>
  )
}