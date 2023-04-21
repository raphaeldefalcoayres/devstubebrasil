import Image from 'next/image'
import Link from 'next/link'

import { formatDuration } from '@/utils'

export default function PlaylistItem({
  video,
  selected,
  className,
}: {
  video: VideoModel
  selected?: string
  className?: string
}) {
  return (
    <Link
      href={`/video/${video.videoId}`}
      className={`flex gap-4 items-center p-2 rounded-xl mb-2 ${
        video.videoId === selected ? 'bg-content2' : 'bg-content'
      } ${className}`}
    >
      <div className="bg-gray-800 h-fit w-fit rounded-br-xl rounded-xl px-2 text-xs py-1 font-semibold">
        {video.position}
      </div>
      <div className="relative rounded-xl overflow-hidden w-44 h-14">
        <div className="w-24 h-20">
          <Image
            fill={true}
            className="object-cover"
            src={video.thumbnail}
            alt={`imagem de capa do vídeo ${video.title}`}
          />
        </div>
        <div className="absolute right-0 bottom-0 bg-black/70 rounded-br-xl rounded-tl-xl px-2 text-xs py-1 font-semibold">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-1 leading-4">
          <strong className="text-sm font-normal line-clamp-2" title={video.title}>
            {video.title}
          </strong>
        </div>
      </div>
    </Link>
  )
}
