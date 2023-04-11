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
    <>
      <MenuTabs data={videos} selected="" />
      <VideosListCarousel videos={videos} channels={channels} />
    </>
  )
}
