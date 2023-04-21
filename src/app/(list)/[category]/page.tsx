import { categoryOrder, subCategoryOrder } from '@/constants'
import fs from 'fs'
import path from 'path'

import MenuSubTabs from '@/components/MenuSubTabs'
import MenuTabs from '@/components/MenuTabs'
import PageVideosList from '@/components/VideosList'

export default async function SearchPage({ params }: { params: null | { category: string; subcategory: string } }) {
  const categorySelected =
    params?.category && categoryOrder.includes(decodeURI(params?.category)) ? decodeURI(params?.category) : ''
  let videos: VideoModel[] = []

  if (categorySelected.startsWith('frontend')) {
    const files = fs.readdirSync('./data')

    videos = files
      .filter((file) => file.startsWith('frontend_'))
      .reduce((acc: any, file: any) => {
        const filePath = path.join(process.cwd(), 'data', file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const videosFromFile = JSON.parse(fileContents)
        return [...acc, ...videosFromFile]
      }, []) as any
  } else {
    const filePath = path.join(process.cwd(), 'data', `${categorySelected}.json`)
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    videos = JSON.parse(fileContents)
  }

  const channelsFilePath = path.join(process.cwd(), 'data', 'channels.json')
  const channelsFileContents = await fs.promises.readFile(channelsFilePath, 'utf8')
  const channels = JSON.parse(channelsFileContents)

  const totalsFilePath = path.join(process.cwd(), 'data', 'totais.json')
  const totalsFileContents = await fs.promises.readFile(totalsFilePath, 'utf8')
  const totals = JSON.parse(totalsFileContents)

  // const categorySelected =
  //   params?.category && categoryOrder.includes(decodeURI(params?.category)) ? decodeURI(params?.category) : ''
  let subcategorySelected
  if (params?.subcategory) {
    subcategorySelected = decodeURI(params?.category)
  } else {
    subcategorySelected = ''
  }
  const subcategories = subCategoryOrder.find((category) => category.name === decodeURI(params?.category ?? ''))

  if (!videos) return 'loading...'

  return (
    <>
      <MenuTabs data={totals} selected={categorySelected} />
      <MenuSubTabs
        data={subcategories}
        videos={videos}
        categorySelected={categorySelected}
        subcategorySelected={subcategorySelected}
      />
      <PageVideosList videos={videos} channels={channels} />
    </>
  )
}
