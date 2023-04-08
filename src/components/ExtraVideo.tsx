import { VideoModel } from '@/@types'
import { formatDuration, getElapsedTime } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function ExtraVideoItem({
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
      <div className="relative rounded-xl w-64 h-20 overflow-hidden">
        <div className="w-36 h-36">
          <Image fill={true} className="object-cover" src={video.thumbnail} alt="thumb" />
        </div>

        <div className="absolute right-0 bottom-0 bg-black/70 rounded-br-xl rounded-tl-xl px-2 text-xs py-1 font-semibold">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-1 leading-4">
          <strong className="w-full text-sm font-normal line-clamp-3" title={video.title}>
            {video.title}
          </strong>
        </div>
      </div>
    </Link>
  )
}
