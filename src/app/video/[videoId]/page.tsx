import { Body } from './body'
import path from 'path'
import fs from 'fs'
import { VideoModel } from '@/@types'

export default async function Page({ params }: { params: { videoId: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos: VideoModel[] = JSON.parse(fileContents)
  const video = videos.find((video) => video.videoId === params.videoId)
  const relatedVideos =
    video?.type === 'single'
      ? videos.filter((videoFind) => videoFind.category === video?.category)?.slice(1, 5)
      : undefined
  const playlist =
    video?.type === 'list'
      ? videos.filter((videoFind) => videoFind.category === video?.category)?.slice(1, 5)
      : undefined

  const videosSorted = videos.sort((a, b) => {
    return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  })

  const videsFiltered = videos.filter(
    (videoFiltered) =>
      videoFiltered.channelId === video?.channelId &&
      videoFiltered.type === 'list' &&
      videoFiltered.category === video.category &&
      videoFiltered.subcategory === video.subcategory
  )

  console.log(videsFiltered)

  const startingVideo = video
  let position = videsFiltered.findIndex((item) => item.videoId === video?.videoId)
  // console.log('position', position)
  // console.log('videos', videos[position])
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

  // const slicedVideos = videsFiltered.slice(position, endingIndex)

  console.log('position', position)
  console.log('endingIndex', endingIndex)
  // console.log('slicedVideos', slicedVideos)

  return <Body video={video!} playlist={videsFiltered} relatedVideos={relatedVideos} />
}
