import { useState } from 'react'
import { motion } from 'framer-motion'

interface PuzzleProps {
  question: string
  answer: string
  onSolved: () => void
}

export default function Puzzle({ question, answer, onSolved }: PuzzleProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userAnswer.toLowerCase().trim() === answer.toLowerCase()) {
      onSolved()
      setUserAnswer('')
      setError('')
    } else {
      setError('Respuesta incorrecta. ¡Inténtalo de nuevo!')
    }
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-md w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4 text-purple-600">{question}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Tu respuesta"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
        >
          Comprobar
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </motion.div>
  )
}