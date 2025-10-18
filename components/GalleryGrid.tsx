'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'

type GalleryItem = {
  id: number
  title: string
  description: string
  imageSrc: string
  category: string
}

// Sample gallery data (you'll replace this with your actual images)
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Masjid Exterior',
    description: 'Front view of Central Jeju Masjid',
    imageSrc: '/assets/bg.jpg',
    category: 'building',
  },
  {
    id: 2,
    title: 'Prayer Hall',
    description: 'Main prayer hall during Jumu\'ah',
    imageSrc: '/assets/jeju-masjid-logo.png',
    category: 'prayer',
  },
  {
    id: 3,
    title: 'Community Iftar',
    description: 'Breaking fast together during Ramadan',
    imageSrc: 'https://placehold.co/600x400/e8f4ea/1a3d5c?text=Community+Iftar',
    category: 'event',
  },
  {
    id: 4,
    title: 'Qur\'an Study',
    description: 'Weekly Qur\'an study circle',
    imageSrc: 'https://placehold.co/600x400/e8f4ea/1a3d5c?text=Quran+Study',
    category: 'education',
  },
  {
    id: 5,
    title: 'Eid Celebration',
    description: 'Eid al-Fitr celebration with the community',
    imageSrc: 'https://placehold.co/600x400/e8f4ea/1a3d5c?text=Eid+Celebration',
    category: 'event',
  },
  {
    id: 6,
    title: 'Islamic Library',
    description: 'Our collection of Islamic books and resources',
    imageSrc: 'https://placehold.co/600x400/e8f4ea/1a3d5c?text=Islamic+Library',
    category: 'education',
  }
  // Add more gallery items here as you get more images
]

// Category filters
const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))]

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading images
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Filter gallery items based on active category
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-islamic-navy sm:text-4xl">
            Gallery
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore moments from our mosque community, events, and activities
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-islamic-green text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-islamic-gold border-t-islamic-navy rounded-full animate-spin"></div>
            <p className="mt-4 text-islamic-navy font-medium">Loading gallery...</p>
          </div>
        )}
        
        {/* Gallery Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition duration-300"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-islamic-navy">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Empty state when no items match filter */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No images found in this category</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-6 py-2 bg-islamic-green text-white rounded-md hover:bg-islamic-green-dark transition-colors"
            >
              View all images
            </button>
          </div>
        )}

        {/* Image modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75 transition-opacity"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedImage.imageSrc}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 bg-white rounded-b-lg">
                <h3 className="font-bold text-xl text-islamic-navy">{selectedImage.title}</h3>
                <p className="text-gray-600 mt-1">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}