import path from 'path'
import fs from 'fs'
import PageVideosList from '@/components/VideosList'
import { categoryOrder, subCategoryOrder } from '@/constants'
import MenuTabs from '@/components/MenuTabs'
import MenuSubTabs from '@/components/MenuSubTabs'

export default async function SearchPage({ params }: { params: null | { category: string; subcategory: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos: VideoModel[] = JSON.parse(fileContents)

  const channelsFilePath = path.join(process.cwd(), 'data', 'channels.json')
  const channelsFileContents = await fs.promises.readFile(channelsFilePath, 'utf8')
  const channels = JSON.parse(channelsFileContents)

  const categorySelected =
    params?.category && categoryOrder.includes(decodeURI(params?.category)) ? decodeURI(params?.category) : undefined
  const subcategorySelected =
    params?.subcategory &&
    subCategoryOrder.some((category) => category.subcategories.includes(decodeURI(params?.subcategory)))
      ? decodeURI(params?.subcategory)
      : undefined

  if (!videos) return 'loading...'

  const subcategories = subCategoryOrder.find((category) => category.name === decodeURI(params?.category!))

  return (
    <>
      <MenuTabs data={videos} selected={categorySelected} />
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
