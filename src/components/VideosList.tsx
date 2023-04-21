'use client'

import { useParams, useSearchParams } from 'next/navigation'
import Spinner from './Spinner'
import VideoCard from './VideoCard'

export default function VideoList({ videos, channels }: { videos: VideoModel[]; channels: ChannelModel[] }) {
  const params = useParams()
  const search = useSearchParams()
  const searchQuery = search ? search.get('q') : null

  if (!videos) {
    return (
      <div className="w-screnn h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  let sanitizedSearchTerm = searchQuery?.toLowerCase().replace(/\.js/g, 'js') || ''

  const singleVideos = videos.filter(
    (video) => video.type === 'single' || (video.type === 'list' && video.position === 1)
  )

  videos = singleVideos.sort((a, b) => {
    return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  })

  // regras de filtro:
  // 1 - se for apenas uma palavra e bater com uma das categorias tipo html ja filtra todos os vídeos por categoria
  // 2 - se tiver .js tanto na palavra da busca quanto no titulo removo pra poder comparar em igualdade
  // 3 - compara-se palavras com letras minúsculas

  videos =
    params.category && params.category !== ''
      ? videos.filter((video) => video.category === decodeURI(params.category))
      : videos
  videos =
    params.subcategory && params.subcategory !== ''
      ? videos.filter((video) => video.subcategory === decodeURI(params.subcategory))
      : videos
  videos =
    sanitizedSearchTerm !== ''
      ? videos.filter((video) => video.title.toLowerCase().includes(sanitizedSearchTerm))
      : videos

  videos = videos.map((videoMapped) => {
    const channelFinded = channels.find((channel) => channel.id === videoMapped.channelId)
    if (channelFinded) {
      videoMapped.channelLogo = channelFinded?.defaultThumbnailUrl!
    }

    return videoMapped
  })

  console.log('videos', videos)
  console.log('params.subcategory', params.subcategory)

  return (
    <div className="bg-sidebar rounded-xl p-4 xl:p-8 overflow-x-hidden">
      {videos && videos.length <= 0 && (
        <div className="w-full h-full flex items-center justify-center">
          Nenhum vídeo encontrado, tente utilizar outras palavras chaves.
        </div>
      )}
      {videos && (
        <div className="videos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-8 xl:gap-8  overflow-y-auto">
          {videos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
