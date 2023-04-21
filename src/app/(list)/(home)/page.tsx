import fs from 'fs'
import path from 'path'

import MenuTabs from '@/components/MenuTabs'
import VideosListCarousel from '@/components/VideosListCarousel'
import { categoryOrder } from '@/constants'

export default async function HomePage() {
  const videos: VideoModel[] = []

  categoryOrder.forEach((categoria) => {
    const caminhoArquivo = `./data/${categoria}.json`
    if (fs.existsSync(caminhoArquivo)) {
      const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf8')
      const dadosCategoria = JSON.parse(conteudoArquivo)
      videos.push(...dadosCategoria)
    }
  })

  const channelsFilePath = path.join(process.cwd(), 'data', 'channels.json')
  const channelsFileContents = await fs.promises.readFile(channelsFilePath, 'utf8')
  const channels = JSON.parse(channelsFileContents)

  const totalsFilePath = path.join(process.cwd(), 'data', 'totais.json')
  const totalsFileContents = await fs.promises.readFile(totalsFilePath, 'utf8')
  const totals = JSON.parse(totalsFileContents)

  return (
    <>
      <MenuTabs data={totals} selected="" />
      <VideosListCarousel videos={videos} channels={channels} />
    </>
  )
}
