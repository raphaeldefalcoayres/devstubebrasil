import path from 'path'
import fs from 'fs'
import PageVideosList from '@/components/VideosList'

export default async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos = JSON.parse(fileContents)

  return <PageVideosList videos={videos} />
}
