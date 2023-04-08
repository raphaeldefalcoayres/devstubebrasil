'use client'

import { CarouselProps, Category, VideoModel } from '@/@types'
import { ThumbVideo } from '@/components/ThumbVideo'
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
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="font-semibold text-md md:text-xl uppercase flex items-center gap-2">{title}</h2>
        <div>
          <button className="disabled:opacity-50" disabled={!hasPreviousPage} onClick={handlePreviousPage}>
            <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="disabled:opacity-50" disabled={!hasNextPage} onClick={handleNextPage}>
            <FaChevronRight className="w-5 h-5 md:w-6 md:h-6" />
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
