'use client'

import { VideoModel } from '@/@types'
import { useSearchParams } from 'next/navigation'
import Spinner from './Spinner'
import { ThumbVideo } from './ThumbVideo'
import { categoryOrder } from '@/constants'
import VideoCard from './VideoCard'

export default function VideoList({ videos }: { videos: VideoModel[] }) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams ? searchParams.get('q') : null
  if (!videos) {
    return (
      <div className="w-screnn h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  let sanitizedSearchTerm = searchQuery?.toLowerCase().replace(/\.js/g, 'js') || ''

  videos = videos.sort((a, b) => {
    return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  })

  // regras de filtro:
  // 1 - se for apenas uma palavra e bater com uma das categorias tipo html ja filtra todos os vídeos por categoria
  // 2 - se tiver .js tanto na palavra da busca quanto no titulo removo pra poder comparar em igualdade
  // 3 - compara-se palavras com letras minúsculas

  if (categoryOrder.includes(sanitizedSearchTerm)) {
    videos = videos.filter((video) => video.category === sanitizedSearchTerm)
  } else {
    videos = videos.filter((video) => {
      let sanitizedTitle = video.title.toLowerCase().replace(/\.js/g, 'js')
      if (sanitizedTitle.endsWith('.js')) {
        sanitizedTitle = sanitizedTitle.substring(0, sanitizedTitle.length - 3)
      }
      return sanitizedTitle.includes(sanitizedSearchTerm)
    })
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-6 4xl:grid-cols-7 gap-4 md:gap-8 w-full h-full relative">
      {videos && videos.length <= 0 && (
        <div className="w-full h-full flex items-center justify-center absolute">
          Nenhum vídeo encontrado, tente utilizar outras palavras chaves.
        </div>
      )}
      {videos && videos.map((video) => <VideoCard key={video.videoId} video={video} />)}
    </div>
  )
}
