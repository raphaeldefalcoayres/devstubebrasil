import { Body } from './body'
import path from 'path'
import fs from 'fs'

export default async function Page({ params }: { params: { videoId: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos: VideoModel[] = JSON.parse(fileContents)
  const video = videos.find((video) => video.videoId === params.videoId)
  const relatedVideos = videos.filter((videoFind) => videoFind.category === video?.category)?.slice(1, 5)

  return <Body video={video!} relatedVideos={relatedVideos} />
}
