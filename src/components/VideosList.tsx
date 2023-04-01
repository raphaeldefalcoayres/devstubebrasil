'use client'

import { VideoModel } from '@/@types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Spinner from './Spinner'
import { Carousel } from './Carousel'

export default function VideolIST({ videos }: { videos: VideoModel[] }) {
  const [videosData, setVideosData] = useState<VideoModel[]>()
  const search = useSearchParams()
  const searchQuery = search ? search.get('q') : null
  const encodedSearchQuery = encodeURI(searchQuery || '')
  const [videosByCategory, setVideosByCategory] = useState<{ [x: string]: any[] | null }>()

  useEffect(() => {
    setVideosData(videos)
    const videosByCategory = videos?.reduce((acc: { [x: string]: any[] }, video: VideoModel) => {
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

    setVideosByCategory(videosByCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (encodedSearchQuery !== '') {
      const newVideos = videos.filter((video) => video.title.toLowerCase().includes(encodedSearchQuery.toLowerCase()))
      setVideosData(newVideos)

      const videosByCategory = newVideos?.reduce((acc: { [x: string]: any[] }, video: VideoModel) => {
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

      setVideosByCategory(videosByCategory)
    } else {
      const newVideos = videos
      setVideosData(newVideos)

      const videosByCategory = newVideos?.reduce((acc: { [x: string]: any[] }, video: VideoModel) => {
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

      setVideosByCategory(videosByCategory)
    }
  }, [videos, encodedSearchQuery])

  if (!videosData) {
    return (
      <div className="w-screnn h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {videosByCategory &&
        Object.keys(videosByCategory).map((category) => (
          <Carousel key={category} data={videosByCategory[category]!} title={category} />
        ))}
    </div>
  )
}
