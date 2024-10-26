'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Language, translations } from '../lib/translations'

interface LearningOutreachComponentProps {
  language: Language
  onBack: () => void
}

export function LearningOutreachComponent({ language, onBack }: LearningOutreachComponentProps) {
  const t = (key: keyof typeof translations.en) => translations[language][key]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('learning')}</h2>
      <p>{t('learningDescription')}</p>
      {/* Add learning and outreach content here */}
      <Button onClick={onBack}>{t('back')}</Button>
    </div>
  )
}