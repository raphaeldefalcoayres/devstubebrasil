'use client'

import { CarouselProps, Category, VideoModel } from '@/@types'
import { ThumbVideo } from '@/components/ThumbVideo'
import { buildCategories } from '@/utils/buildCategories'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
        <h2 className="mb-4 font-semibold text-xl uppercase flex items-center gap-2">
          {title}{' '}
          <span className="bg-blue-500 text-base py-0 px-1 rounded-lg">
            {totalsByCagegory && totalsByCagegory[title]}
          </span>
        </h2>
        <div>
          <button className="disabled:opacity-50" disabled={!hasPreviousPage} onClick={handlePreviousPage}>
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button className="disabled:opacity-50" disabled={!hasNextPage} onClick={handleNextPage}>
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-4 h-80 relative">
        {thumbsVideosData[currentPage]?.videos.map((video: VideoModel) => (
          <ThumbVideo
            className="w-[calc(100%-15px)] md:w-[calc(33%-15px)] lg:w-[calc(25%-15px)] 3xl:w-[calc(20%-15px)] 4xl:w-[calc(16.7%-15px)]"
            key={video.videoId}
            video={video}
          />
        ))}
      </div>
    </div>
  )
}

export { Carousel }
