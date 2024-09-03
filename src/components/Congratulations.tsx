// src/components/Congratulations.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'

interface GiftImage {
  src: string;
  message: string;
}

const giftImages: GiftImage[] = [
  { 
    src: "/images/1.jpeg", 
    message: "¡Feliz cumpleaños! Que este día esté lleno de alegría y sorpresas." 
  },
  { 
    src: "/images/2.jpeg", 
    message: "Que todos tus deseos se hagan realidad en este nuevo año de vida." 
  },
  { 
    src: "/images/3.jpeg", 
    message: "Celebrando otro año de tu maravillosa existencia. ¡Felicidades!"
  },
  { 
    src: "/images/5.jpg",
    message: "Sabías que esta foto (Eclipse Over The Mountain) fue tomada por la NASA el 2/09/1999, ¡justo el mismo día de tu nacimiento!"
  },
]

export default function Congratulations() {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-4xl w-full text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-purple-600">¡Felicidades! Lo has logrado</h2>
      <p className="text-xl text-gray-700 mb-6">
        Has resuelto todos los acertijos. Aquí está tu regalo especial:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {giftImages.map((image, index) => (
          <FlippableImage key={index} image={image} />
        ))}
      </div>
      <p className="text-lg text-gray-700 mb-4">
        Espero que hayas disfrutado de esta pequeña aventura. ¡Que tengas un día maravilloso!
      </p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 500, damping: 10 }}
      >
        <FaHeart className="text-6xl text-red-500 mx-auto" />
      </motion.div>
    </motion.div>
  )
}

function FlippableImage({ image }: { image: GiftImage }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      className="relative cursor-pointer perspective"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleClick}
    >
      <div className="relative w-full h-48 sm:h-40 md:h-48 lg:h-40 xl:h-48">
        <div className={`absolute inset-0 backface-hidden ${isFlipped ? 'hidden' : ''}`}>
          <Image 
            src={image.src} 
            alt="Regalo de cumpleaños" 
            fill 
            style={{ objectFit: 'cover' }} 
            className="rounded-lg"
          />
        </div>
        <div className={`absolute inset-0 backface-hidden bg-purple-600 rounded-lg flex items-center justify-center p-4 text-white text-center ${isFlipped ? '' : 'hidden'}`} style={{ transform: 'rotateY(180deg)' }}>
          <p>{image.message}</p>
        </div>
      </div>
    </motion.div>
  )
}
