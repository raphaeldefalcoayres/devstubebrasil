import path from 'path'
import fs from 'fs'
import PageVideosList from '@/components/VideosList'
import { categoryOrder, menuOptions } from '@/constants'
import { VideoModel } from '@/@types'
import MenuTabs from '@/components/MenuTabs'
import VideosListCarousel from '@/components/VideosListCarousel'

export default async function SearchPage({ searchParams }: { searchParams: null | { q: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  let videos: VideoModel[] = JSON.parse(fileContents)

  const selected = searchParams?.q && categoryOrder.includes(searchParams?.q) ? searchParams?.q : undefined

  // return <PageVideosList videos={videos} />
  return (
    <div className="w-full flex flex-col gap-4 md:gap-8 h-full">
      <MenuTabs menuOptions={menuOptions} selected={selected} />
      {/* <div className="md:flex-1 w-full bg-sidebar rounded-xl p-8 grid grid-cols-1 md:grid-cols-5 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto h-[75vh] md:max-h-[calc(100vh-285px)]"> */}
      <div className="md:flex-1 w-full bg-sidebar rounded-xl p-4 md:p-8 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto h-[70vh] md:max-h-[calc(100vh-285px)]">
        <PageVideosList videos={videos} />
      </div>
    </div>
  )
}
