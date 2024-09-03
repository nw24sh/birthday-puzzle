'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Puzzle from '@/components/Puzzle'

const puzzles = [
  { question: "¿Cuál es el animal más rápido del mundo?", answer: "guepardo" },
  { question: "¿Qué fruta es conocida por tener su semilla en el exterior?", answer: "fresa" },
  { question: "¿En qué año se celebró la primera llegada del hombre a la Luna?", answer: "1969" },
  { question: "¿Qué planeta es conocido como el (Planeta Rojo)?", answer: "marte" },
  { question: "¿Cuál es el país más grande del mundo?", answer: "rusia" },
]

export default function PuzzlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const puzzleId = parseInt(params.id) - 1
  const [error, setError] = useState('')

  if (puzzleId < 0 || puzzleId >= puzzles.length) {
    return <div>Pregunta no encontrada</div>
  }

  const handlePuzzleSolved = () => {
    if (puzzleId < puzzles.length - 1) {
      router.push(`/puzzle/${puzzleId + 2}`)
    } else {
      router.push('/congratulations')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-600 p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
        Pregunta {puzzleId + 1}
      </h1>
      
      <Puzzle 
        question={puzzles[puzzleId].question}
        answer={puzzles[puzzleId].answer}
        onSolved={handlePuzzleSolved}
      />
      
      <div className="mt-4 text-white">
        {puzzleId + 1} / {puzzles.length} Preguntas
      </div>
    </div>
  )
}