import path from 'path'
import fs from 'fs'

import MenuTabs from '@/components/MenuTabs'
import VideosListCarousel from '@/components/VideosListCarousel'

export default async function HomePage() {
  const videosFilePath = path.join(process.cwd(), 'data', 'videos.json')
  const videosFileContents = await fs.promises.readFile(videosFilePath, 'utf8')
  const videos = JSON.parse(videosFileContents)

  const channelsFilePath = path.join(process.cwd(), 'data', 'channels.json')
  const channelsFileContents = await fs.promises.readFile(channelsFilePath, 'utf8')
  const channels = JSON.parse(channelsFileContents)

  return (
    <div className="w-full flex flex-col gap-8 h-full">
      <MenuTabs data={videos} selected="" />
      <div className="md:flex-1 w-full bg-sidebar rounded-xl p-4 md:p-8 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto h-[70vh] md:max-h-[calc(100vh-285px)]">
        <VideosListCarousel videos={videos} channels={channels} />
      </div>
    </div>
  )
}
