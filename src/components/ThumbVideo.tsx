'use client'

import { VideoModel } from '@/@types'
import { formatDuration, getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface ThumbVideoProps {
  video: VideoModel
  className?: string
}

const ThumbVideo = ({ video, className = '' }: ThumbVideoProps) => {
  const [videoData, setVideoData] = useState<VideoModel | null>(null)

  useEffect(() => {
    setVideoData(video)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!videoData) {
    return <></>
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <Link href={`/${videoData.videoId}`} className="w-full h-52 overflow-hidden rounded-xl relative">
        <Image fill={true} className="object-cover" src={videoData.thumbnail} alt="thumb" />
        <div className="absolute z-10 right-2 bottom-2 bg-black/70 rounded-lg text-xs p-1">
          {formatDuration(videoData.duration)}
        </div>
      </Link>
      <div className="flex py-3">
        <div className="relative overflow-hidden w-[48px] h-[48px] rounded-full border-2 border-gray-700">
          <Image fill={true} src={videoData.channelLogo} alt="channel thumb" />
        </div>
        <div className="w-[82%] pl-2 pr-2">
          <Link href={`/${videoData.videoId}`} className="line-clamp-2 leading-5" title={videoData.title}>
            {videoData.title}
          </Link>
          <div className="opacity-40 leading-5 mt-1">
            {videoData.channelTitle} <br />
            <small>
              {formatViewCount(videoData.viewCount)} Visualizações. {getElapsedTime(videoData.publishTime)}
            </small>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          {/* <button className="text-[#2D3668] hover:text-[#4f5a99]">
            <FaChevronUp className="w-6 h-6" />
          </button>
          <strong className="font-semibold text-sm" title="Relevancia">
            {videoData.relevance}
          </strong>
          <button className="text-[#682D2D] hover:text-[#aa5959]">
            <FaChevronDown className="w-6 h-6" />
          </button> */}
        </div>
      </div>
    </div>
  )
}

export { ThumbVideo }
