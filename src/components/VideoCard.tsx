import { formatDuration, getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'
import Image from 'next/image'
import Link from 'next/link'

export default function VideoCard({ video, className }: { video: VideoModel; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Link href={`/video/${video.videoId}`} className="w-full h-44 overflow-hidden rounded-xl relative">
        <Image fill={true} className="object-cover" src={video.thumbnail} alt="thumb" />
        {video.type === 'list' && (
          <div className="absolute top-0 left-0 bg-black/70 rounded-br-xl rounded-tl-xl px-2 text-xs py-1 font-semibold">
            {video.position === 1 ? 'Playlist' : video.position}
          </div>
        )}
        <div className="absolute right-0 bottom-0 bg-black/70 rounded-br-xl rounded-tl-xl px-2 text-xs py-1 font-semibold">
          {formatDuration(video.duration)}
        </div>
      </Link>
      <div className="flex gap-2 w-full">
        <div className="w-8 h-8 rounded-xl relative overflow-hidden border-2 border-gray-900">
          <Image fill={true} src={video.channelLogo} alt={`imagem do canal ${video.channelTitle}`} />
        </div>
        <div className="flex flex-col gap-1 leading-4 w-[80%]">
          <strong className="truncate w-full" title={video.title}>
            {video.title}
          </strong>
          <div className="flex items-center justify-between text-xs gap-2">
            <div className="truncate max-w-[35%]" title={video.channelTitle}>
              {video.channelTitle}
            </div>
            <small>
              {formatViewCount(video.viewCount)} Visualizações. {getElapsedTime(video.publishTime)}
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}
