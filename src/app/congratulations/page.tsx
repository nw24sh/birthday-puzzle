'use client'

import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Congratulations from '@/components/Congratulations'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

export default function CongratulationsPage() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true) // Inicialmente el audio está reproduciéndose
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioElement = new Audio('/music/happy.mp3')
    setAudio(audioElement)

    // Inicia la reproducción del audio al montar el componente
    audioElement.play().catch((error) => {
      console.error('Error al reproducir el audio:', error)
      setIsPlaying(false) // Si hay un error, el audio no está reproduciéndose
    })

    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.currentTime = 0
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-600 p-4 flex flex-col items-center justify-center">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
        ¡Felicidades!
      </h1>
      
      <Congratulations />
      
      <button onClick={togglePlay} className="mt-4 text-white text-2xl">
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
    </div>
  )
}
