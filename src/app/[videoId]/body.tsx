'use client'

import { VideoModel } from '@/@types'
import Spinner from '@/components/Spinner'
import { ThumbVideo } from '@/components/ThumbVideo'
import { getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import ReactPlayer from 'react-player'

const Body = ({ video, relatedVideos }: { video: VideoModel; relatedVideos: VideoModel[] }) => {
  const [videoData, setVideoData] = useState<VideoModel | null>()
  const [relatedVideosData, setRelatedVideosData] = useState<VideoModel[] | null>()
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    setVideoData(video)
    setRelatedVideosData(relatedVideos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!videoData) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex md:flex-row flex-col mt-4">
      <div className="w-full md:w-[70vw]">
        <div className="w-full h-[39.5vw] rounded-xl overflow-hidden">
          <ReactPlayer
            controls={true}
            width={'100%'}
            height={'100%'}
            url={`https://www.youtube.com/watch?v=${videoData.videoId}`}
          />
        </div>
        <div className="flex w-full p-4 flex-col">
          <h2 className="text-xl font-semibold">{videoData.title}</h2>
          <div className="flex pt-3 pb-2">
            <div className="relative overflow-hidden w-[48px] h-[44px] rounded-full border-2 border-gray-700">
              <Image fill={true} src={videoData.channelLogo} alt="channel thumb" />
            </div>
            <div className="w-fit px-2">
              <div className="opacity-40 leading-5 mt-1">
                {videoData.channelTitle} <br />
                <small>
                  {formatViewCount(videoData.viewCount)} Visualizações. {getElapsedTime(videoData.publishTime)}
                </small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start -mt-3">
              <button className="text-[#2D3668] hover:text-[#4f5a99]">
                <FaChevronUp className="w-6 h-6" />
              </button>
              <strong className="font-semibold text-sm" title="Relevancia">
                {videoData.relevance}
              </strong>
              <button className="text-[#682D2D] hover:text-[#aa5959]">
                <FaChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className={`${!showMore ? 'line-clamp-3' : ''} leading-6`}>{videoData.description}</div>
          <button className="text-left font-semibold" onClick={() => setShowMore(!showMore)}>
            Ver {!showMore ? 'mais' : 'menos'}
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-4">
        {relatedVideosData &&
          relatedVideosData.map((relatedVideo: VideoModel) => (
            <ThumbVideo className="w-full" key={relatedVideo.videoId} video={relatedVideo} />
          ))}
      </div>
    </div>
  )
}

export { Body }
