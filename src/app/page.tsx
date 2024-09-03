'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBirthdayCake } from 'react-icons/fa'
import Countdown from '@/components/Countdown'

const birthdayDate = new Date('2024-09-04') // Ajusta esta fecha al cumpleaños real

export default function HomePage() {
  const [isBirthdayReached, setIsBirthdayReached] = useState(false)

  useEffect(() => {
    const checkBirthday = () => {
      const now = new Date()
      setIsBirthdayReached(now >= birthdayDate)
    }

    checkBirthday()
    const timer = setInterval(checkBirthday, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-600 p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
      </h1>
      <Countdown targetDate={birthdayDate} />
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Bienvenida a tu sorpresa de cumpleaños</h2>
        <p className="text-gray-700 mb-4">
          {isBirthdayReached
            ? "¡Es hora de descubrir tu regalo especial! Tendrás que resolver algunas preguntas."
            : "Tu aventura comenzará cuando llegue el gran día. ¡Espera un poco más!"}
        </p>
        {isBirthdayReached ? (
          <Link 
            href="/puzzle/1" 
            className="inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
          >
            Comenzar
          </Link>
        ) : (
          <button 
            className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
            disabled
          >
            Comenzar
          </button>
        )}
      </div>
      
      <FaBirthdayCake className="text-6xl text-yellow-300" />
    </div>
  )
}
