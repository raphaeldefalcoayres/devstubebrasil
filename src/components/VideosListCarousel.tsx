'use client'

import { useSearchParams } from 'next/navigation'
import Spinner from './Spinner'
import { Carousel } from './Carousel'
import { useVideoList } from '@/hooks'

export default function VideosListCarousel({ videos, channels }: { videos: VideoModel[]; channels: ChannelModel[] }) {
  const search = useSearchParams()
  const { videosData, videosByCategory } = useVideoList({ videos, channels, search })

  if (!videosData) {
    return (
      <div className="w-screnn h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="videos gap-8 xl:gap-8 bg-sidebar rounded-xl p-4 xl:p-8 overflow-x-hidden overflow-y-auto">
      {videosByCategory &&
        Object.keys(videosByCategory).map((category) => (
          <Carousel key={category} data={videosByCategory[category]!} title={category} />
        ))}
    </div>
  )
}
