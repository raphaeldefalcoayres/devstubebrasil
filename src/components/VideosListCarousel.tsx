'use client'

import { VideoModel } from '@/@types'
import { useSearchParams } from 'next/navigation'
import Spinner from './Spinner'
import { Carousel } from './Carousel'
import { useVideoList } from '@/hooks'

export default function VideosListCarousel({ videos }: { videos: VideoModel[] }) {
  const search = useSearchParams()
  const { videosData, videosByCategory } = useVideoList({ videos: videos, search })

  if (!videosData) {
    return (
      <div className="w-screnn h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {videosByCategory &&
        Object.keys(videosByCategory).map((category) => (
          <Carousel key={category} data={videosByCategory[category]!} title={category} />
        ))}
    </div>
  )
}
