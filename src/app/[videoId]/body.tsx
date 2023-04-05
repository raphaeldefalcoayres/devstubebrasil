'use client'

import { VideoModel } from '@/@types'
import Spinner from '@/components/Spinner'
import { ThumbVideo } from '@/components/ThumbVideo'
import VideoCard from '@/components/VideoCard'
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
    <div className="flex md:flex-row flex-col gap-4 md:gap-8">
      <div className="md:w-[60vw] w-full bg-sidebar rounded-xl p-4 md:p-8 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto md:h-[calc(100vh-200px)]">
        <div className="w-full h-full">
          <div className="w-full h-[50vw] md:h-[30vw] rounded-xl overflow-hidden">
            <ReactPlayer
              controls={true}
              width={'100%'}
              height={'100%'}
              url={`https://www.youtube.com/watch?v=${videoData.videoId}`}
            />
          </div>
          <div className="flex w-full flex-col mt-4">
            <div className="flex pt-3 pb-2 gap-4">
              <div className="w-8 h-8 rounded-xl relative overflow-hidden">
                <Image fill={true} src={video.channelLogo} alt="channel thumb" />
              </div>
              <div className="flex flex-col gap-1 leading-4 w-[80%]">
                <strong className="truncate w-full" title={video.title}>
                  {video.title}
                </strong>
                <div className="flex items-center justify-start text-xs gap-2">
                  <div>{video.channelTitle}</div>
                  <small>
                    {formatViewCount(video.viewCount)} Visualizações. {getElapsedTime(video.publishTime)}
                  </small>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start -mt-3">
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
            <div className={`${!showMore ? 'line-clamp-3' : ''} leading-6`}>{videoData.description}</div>
            <button className="text-left font-semibold" onClick={() => setShowMore(!showMore)}>
              Ver {!showMore ? 'mais' : 'menos'}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:flex-1 bg-sidebar rounded-xl overflow-x-hidden md:overflow-y-auto md:h-[calc(100vh-200px)]">
        <div className="flex flex-1 flex-col h-full ">
          <div className="h-full overflow-x-hidden overflow-y-auto p-4 md:p-8 md:gap-8 gap-4 grid grid-cols-1">
            {relatedVideosData &&
              relatedVideosData.map((relatedVideo: VideoModel) => (
                <VideoCard key={relatedVideo.videoId} video={relatedVideo} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Body }
