"use client";

import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: Date
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date()
    let timeLeft: { [key: string]: number | undefined } = {}

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (timeLeft[interval] === undefined || timeLeft[interval] === 0) {
      return null
    }

    return (
      <span className="text-2xl font-bold mr-2" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    )
  })

  return (
    <div className="text-white text-center mb-8">
      {timerComponents.length ? (
        <>
          <h2 className="text-xl mb-2">Tiempo hasta el gran día:</h2>
          {timerComponents}
        </>
      ) : (
        <span className="text-2xl font-bold"></span>
      )}
    </div>
  )
}
