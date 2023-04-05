import path from 'path'
import fs from 'fs'

import MenuTabs from '@/components/MenuTabs'
import VideoCard from '@/components/VideoCard'
import VideosListCarousel from '@/components/VideosListCarousel'
import { menuOptions } from '@/constants'

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos = JSON.parse(fileContents)

  return (
    <div className="w-full flex flex-col gap-8 h-full">
      <MenuTabs data={videos} />
      {/* <div className="md:flex-1 w-full bg-sidebar rounded-xl p-8 grid grid-cols-1 md:grid-cols-5 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto h-[75vh] md:max-h-[calc(100vh-285px)]"> */}
      <div className="md:flex-1 w-full bg-sidebar rounded-xl p-8 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto h-[75vh] md:max-h-[calc(100vh-285px)]">
        <VideosListCarousel videos={videos} />
      </div>
    </div>
  )
}
