'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Language, translations } from '../lib/translations'

interface GalleryComponentProps {
  language: Language
  onBack: () => void
}

export function GalleryComponent({ language, onBack }: GalleryComponentProps) {
  const t = (key: keyof typeof translations.en) => translations[language][key]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('gallery')}</h2>
      <p>{t('galleryDescription')}</p>
      {/* Add gallery content here */}
      <Button onClick={onBack}>{t('back')}</Button>
    </div>
  )
}