import path from 'path'
import fs from 'fs'
import PageVideosList from '@/components/VideosList'
import { categoryOrder } from '@/constants'
import { VideoModel } from '@/@types'

export default async function SearchPage({ searchParams }: { searchParams: null | { q: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  let videos: VideoModel[] = JSON.parse(fileContents)

  return <PageVideosList videos={videos} />
}
