'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import ExtraVideoItem from '@/components/ExtraVideo'
import PlaylistItem from '@/components/PlaylistItem'
import Spinner from '@/components/Spinner'

import { getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'

const Body = ({
  video,
  playlist,
  relatedVideos,
}: {
  video: VideoModel
  playlist?: VideoModel[]
  relatedVideos?: VideoModel[]
}) => {
  const [videoData, setVideoData] = useState<VideoModel | null>()
  const [relatedVideosData, setRelatedVideosData] = useState<VideoModel[] | null>()
  const [playlistData, setPlaylistData] = useState<VideoModel[] | null>()
  const [showMore, setShowMore] = useState(false)

  const fetchVideoData = useCallback(() => {
    setVideoData(video)
    setRelatedVideosData(relatedVideos)
    setPlaylistData(playlist)
  }, [playlist, relatedVideos, video])

  useEffect(() => {
    fetchVideoData()
  }, [fetchVideoData])

  if (!videoData) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-4 h-full">
      <div className="md:w-[60vw] w-full md:h-full bg-sidebar rounded-xl p-4 md:p-4 md:gap-4 gap-4 overflow-x-hidden md:overflow-y-auto">
        <div className="md:w-full md:h-full">
          <div className="md:w-full h-[48vw] md:h-[32.8vw] rounded-xl overflow-hidden">
            <ReactPlayer
              controls={true}
              width={'100%'}
              height={'100%'}
              url={`https://www.youtube.com/watch?v=${videoData.videoId}`}
            />
          </div>
          <div className="flex w-full flex-col mt-4">
            <div className="flex pt-3 pb-2 gap-4">
              <div className="w-8 h-8 rounded-lg relative overflow-hidden">
                <Image fill={true} src={video.channelLogo} alt="channel thumb" />
              </div>
              <div className="flex flex-col gap-1 leading-4 w-[69vw] md:w-[80%]">
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
            </div>
            <div className={`${!showMore ? 'line-clamp-2' : ''} leading-6`}>{videoData.description}</div>
            <button className="text-left font-semibold" onClick={() => setShowMore(!showMore)}>
              Ver {!showMore ? 'mais' : 'menos'}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:flex-1 bg-sidebar rounded-xl overflow-x-hidden md:overflow-y-auto">
        <div className="flex flex-1 flex-col h-full ">
          <div className="h-full p-4 md:p-4 md:gap-4 gap-4 grid grid-cols-1">
            {video.type === 'single' && relatedVideosData && (
              <>
                <h2>Outros vídeos como esse</h2>
                <div className="overflow-x-hidden overflow-y-auto">
                  {relatedVideosData.map((relatedVideo: VideoModel) => (
                    <ExtraVideoItem key={relatedVideo.videoId} video={relatedVideo} />
                  ))}
                </div>
              </>
            )}
            {video.type === 'list' && playlistData && (
              <>
                <h2>Playlist</h2>
                <div className="bg-black rounded-xl p-4 overflow-x-hidden overflow-y-auto">
                  {playlistData
                    .sort((a, b) => a.position - b.position)
                    .map((playlistVideo: VideoModel) => (
                      <PlaylistItem key={playlistVideo.videoId} video={playlistVideo} selected={video.videoId} />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Body }
