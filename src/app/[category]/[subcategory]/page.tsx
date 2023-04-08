import path from 'path'
import fs from 'fs'
import PageVideosList from '@/components/VideosList'
import { categoryOrder, subCategoryOrder } from '@/constants'
import { VideoModel } from '@/@types'
import MenuTabs from '@/components/MenuTabs'
import MenuSubTabs from '@/components/MenuSubTabs'

export default async function SearchPage({ params }: { params: null | { category: string; subcategory: string } }) {
  console.log(params)
  const filePath = path.join(process.cwd(), 'data', 'videos.json')
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const videos: VideoModel[] = JSON.parse(fileContents)
  const categorySelected =
    params?.category && categoryOrder.includes(decodeURI(params?.category)) ? decodeURI(params?.category) : undefined
  console.log(categorySelected)
  const subcategorySelected =
    params?.subcategory &&
    subCategoryOrder.some((category) => category.subcategories.includes(decodeURI(params?.subcategory)))
      ? decodeURI(params?.subcategory)
      : undefined

  console.log('subcategorySelected', subcategorySelected)

  if (!videos) return 'loading...'

  const subcategories = subCategoryOrder.find((category) => category.name === decodeURI(params?.category!))

  return (
    <div className="w-full flex flex-col gap-4 md:gap-8 h-full">
      <MenuTabs data={videos} selected={categorySelected} />
      <MenuSubTabs
        data={subcategories}
        videos={videos}
        categorySelected={categorySelected}
        subcategorySelected={subcategorySelected}
      />
      <div className="md:flex-1 w-full bg-sidebar rounded-xl p-4 md:p-8 md:gap-8 gap-4 overflow-x-hidden md:overflow-y-auto h-[70vh] md:max-h-[calc(100vh-270px)]">
        <PageVideosList videos={videos} />
      </div>
    </div>
  )
}
