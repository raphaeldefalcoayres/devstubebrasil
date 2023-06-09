import { ReadonlyURLSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useVideosFilter } from './useVideosFilter'
import { categoryOrder } from '@/constants'

export const useVideoList = ({
  videos,
  channels,
  search,
}: {
  videos: VideoModel[]
  channels: ChannelModel[]
  search: ReadonlyURLSearchParams
}) => {
  const { filter } = useVideosFilter()
  const [videosData, setVideosData] = useState<VideoModel[]>()
  const searchQuery = search ? search.get('q') : null
  const encodedSearchQuery = encodeURI(searchQuery || '')
  const [videosByCategory, setVideosByCategory] = useState<{ [x: string]: any[] | null }>()

  function generateVideosByCategory({ videos }: { videos: VideoModel[] }) {
    const singleVideos = videos.filter(
      (video) => video.type === 'single' || (video.type === 'list' && video.position === 1)
    )

    let sortedVideos = singleVideos.sort((a, b) => {
      return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
    })

    sortedVideos = sortedVideos.sort((a: { category: string }, b: { category: string }) => {
      const aCategoryIndex = categoryOrder.indexOf(a.category)
      const bCategoryIndex = categoryOrder.indexOf(b.category)
      return aCategoryIndex - bCategoryIndex
    })

    sortedVideos = sortedVideos.map((videoMapped) => {
      const channelFinded = channels.find((channel) => channel.id === videoMapped.channelId)
      if (channelFinded) {
        videoMapped.channelLogo = channelFinded?.defaultThumbnailUrl!
      }

      return videoMapped
    })

    return sortedVideos?.reduce((acc: { [x: string]: any[] }, video: VideoModel) => {
      const category = video.category || 'Outros'
      const durationMinutes = Math.floor(video.duration)
      if (durationMinutes > 1) {
        // adiciona a verificação de duração
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(video)
      }
      return acc
    }, {} as Record<string, VideoModel[]>)
  }

  useEffect(() => {
    const newVideos = filter({ videos, search: decodeURIComponent(encodedSearchQuery) })
    setVideosData(newVideos)
    const videosByCategory = generateVideosByCategory({ videos: newVideos })
    setVideosByCategory(videosByCategory)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos, encodedSearchQuery])

  return { videosData, videosByCategory }
}
