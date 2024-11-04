'use client'
import { useState } from 'react'
import axios from 'axios'
import { Button } from '../components/ui/button'
import { translations } from '../lib/translations'

interface EventsComponentProps {
  language: keyof typeof translations;
  onBack: () => void;
}

export function EventsComponent({ language, onBack }: EventsComponentProps) {
  const [city, setCity] = useState('')
  const [events, setEvents] = useState<{ id: string, label: string, description: string }[]>([])
  const t = (key: keyof typeof translations.en): string => translations[language][key]

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${city}&language=en&format=json`)
      const data = response.data as { search: { id: string, label: string, description: string }[] }
      const eventData = data.search.map((item: { id: string, label: string, description: string }) => ({
        id: item.id,
        label: item.label,
        description: item.description
      }))
      setEvents(eventData)
    } catch (error: unknown) {
      console.error('Error fetching events:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('events')}</h2>
      <p>{t('eventsDescription')}</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder={t('enterCity')}
        className="border p-2 rounded"
      />
      <Button onClick={fetchEvents}>{t('search')}</Button>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3 className="text-xl font-semibold">{event.label}</h3>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
      <Button onClick={onBack}>{t('back')}</Button>
    </div>
  )
}