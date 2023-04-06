'use client'

import { buildCategories } from '@/utils/buildCategories'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import VideoCard from './VideoCard'

interface totalsByCagegoryProps {
  [category: string]: number
}

const Carousel = ({ data, title }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [thumbsVideosData, setThumbsVideosData] = useState<Category[]>([])
  const [totalsByCagegory, setTotalsByCagegory] = useState<totalsByCagegoryProps>()

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    const totalsByCagegory: totalsByCagegoryProps = {}

    data.forEach((item) => {
      if (totalsByCagegory[item.category]) {
        totalsByCagegory[item.category] += 1
      } else {
        totalsByCagegory[item.category] = 1
      }
    })

    setTotalsByCagegory(totalsByCagegory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const categories = buildCategories(data)
    setThumbsVideosData(categories)
    setHasNextPage(currentPage < categories.length - 1)
    setHasPreviousPage(currentPage > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center justify-between">
        <h2 className="mb-4 font-semibold text-xl uppercase flex items-center gap-2">{title}</h2>
        <div>
          <button className="disabled:opacity-50" disabled={!hasPreviousPage} onClick={handlePreviousPage}>
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button className="disabled:opacity-50" disabled={!hasNextPage} onClick={handleNextPage}>
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="w-full flex-wrap grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-6 4xl:grid-cols-7 md:gap-8 gap-4 relative">
        {thumbsVideosData[currentPage]?.videos.map((video: VideoModel) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  )
}

export { Carousel }
