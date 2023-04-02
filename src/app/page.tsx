import path from 'path'
import fs from 'fs'
import VideosListCarousel from '@/components/VideosListCarousel'

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos = JSON.parse(fileContents)

  return <VideosListCarousel videos={videos} />
}
