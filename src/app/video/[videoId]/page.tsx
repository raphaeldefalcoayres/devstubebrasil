import { Body } from './body'
import path from 'path'
import fs from 'fs'
import { ChannelModel, VideoModel } from '@/@types'

export default async function Page({ params }: { params: { videoId: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos: VideoModel[] = JSON.parse(fileContents)

  const channelsFilePath = path.join(process.cwd(), 'data', 'channels.json')
  const channelsFileContents = await fs.promises.readFile(channelsFilePath, 'utf8')
  const channels = JSON.parse(channelsFileContents)

  const video = videos.find((video) => video.videoId === params.videoId)

  const channelFinded = channels.find((channel: ChannelModel) => channel.id === video?.channelId)
  if (video && channelFinded) {
    video.channelLogo = channelFinded?.defaultThumbnailUrl!
  }

  const relatedVideos =
    video?.type === 'single'
      ? videos.filter(
          (videoFind) =>
            videoFind.category === video?.category &&
            videoFind.subcategory === video?.subcategory &&
            videoFind.videoId !== video.videoId &&
            (videoFind.type === 'single' || (videoFind.type === 'list' && videoFind.position === 1))
        )
      : undefined

  const videsFiltered = videos.filter((videoFiltered) => {
    if (
      videoFiltered.channelId === video?.channelId &&
      videoFiltered.type === 'list' &&
      videoFiltered.category === video.category &&
      videoFiltered.subcategory === video.subcategory
    ) {
      const channelFinded = channels.find((channel: ChannelModel) => channel.id === videoFiltered?.channelId)
      if (channelFinded) {
        videoFiltered.channelLogo = channelFinded?.defaultThumbnailUrl!
      }
      return videoFiltered
    }
  })

  const startingVideo = video
  let position = videsFiltered.findIndex((item) => item.videoId === video?.videoId)
  let endingIndex = position + 1

  for (let i = position + 1; i < videsFiltered.length; i++) {
    const video = videos[i]

    if (
      video.channelId !== startingVideo?.channelId &&
      video.type !== startingVideo?.type &&
      video.category !== startingVideo?.category &&
      video.subcategory !== startingVideo?.subcategory
    ) {
      endingIndex = i
      break
    }
  }

  return <Body video={video!} playlist={videsFiltered} relatedVideos={relatedVideos} />
}
