import path from 'path'
import fs from 'fs'
import PageVideosList from '@/components/VideosList'
import { categoryOrder } from '@/constants'
import MenuTabs from '@/components/MenuTabs'

export default async function SearchPage({ searchParams }: { searchParams: null | { q: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos: VideoModel[] = JSON.parse(fileContents)
  const selected = searchParams?.q && categoryOrder.includes(searchParams?.q) ? searchParams?.q : undefined

  if (!videos) return 'loading...'

  return (
    <div className="w-full flex flex-col gap-4 md:gap-8 h-full">
      <MenuTabs data={videos} selected={selected} />
      <div className="md:flex-1 w-full bg-sidebar rounded-xl p-4 md:p-8 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto h-[70vh] md:max-h-[calc(100vh-285px)]">
        <PageVideosList videos={videos} />
      </div>
    </div>
  )
}
