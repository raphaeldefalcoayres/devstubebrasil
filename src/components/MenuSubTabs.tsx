'use client'

import { VideoModel } from '@/@types'
import { subCategoryOrder } from '@/constants'
import Link from 'next/link'
import { useState } from 'react'

type MenuSubTabsProps = {
  data: any
  videos: VideoModel[]
  categorySelected?: string
  subcategorySelected?: string
}

interface CategoryCount {
  name: string
  total: number
}

export default function MenuSubTabs({ data, videos, categorySelected, subcategorySelected }: MenuSubTabsProps) {
  const [selectedTab, setSelectedTab] = useState(subcategorySelected)

  console.log(data)

  const categoryCounts = []
  let totalTotal = 0

  const singleVideos = videos.filter(
    (video) => video.type === 'single' || (video.type === 'list' && video.position === 1)
  )

  if (data?.subcategories) {
    for (const subcategory of data.subcategories) {
      let totalCount = 0

      for (const video of singleVideos) {
        if (video.subcategory && video.subcategory.includes(subcategory)) {
          totalCount++
          totalTotal++
        }
      }

      categoryCounts.push({ name: subcategory, total: totalCount })
    }
  }

  return (
    <div className="text-sm font-medium text-center text-primary_light -mt-4 -mb-4">
      <ul className="flex md:flex-wrap -mb-px overflow-x-auto justify-around">
        <Link
          href={`/${categorySelected}`}
          className={`text-center text-sm pl-2 py-1 border-transparent rounded-lg hover:bg-blue-500 ${
            selectedTab === '' ? 'text-white bg-blue-600 active' : ''
          }`}
          onClick={() => setSelectedTab('')}
        >
          <span className="uppercase">Todos</span>
          <span
            className={` text-sm py-1 px-2 rounded-lg ${
              selectedTab === '' ? 'text-white bg-white/30' : 'text-gray-800 bg-white/30'
            } ml-2`}
          >
            {totalTotal}
          </span>
        </Link>

        {categoryCounts.map((option) => (
          <Link
            href={`/${categorySelected}/${option.name}`}
            key={option.name}
            className={`text-center text-sm pl-2 py-1 border-transparent rounded-lg hover:bg-blue-500 ${
              selectedTab === option.name ? 'text-white bg-blue-600 active' : ''
            }`}
            onClick={() => setSelectedTab(option.name)}
          >
            <span className="uppercase">{option.name}</span>
            <span
              className={` text-sm py-1 px-2 rounded-lg ${
                selectedTab === option.name ? 'text-white bg-white/30' : 'text-gray-800 bg-white/30'
              } ml-2`}
            >
              {option.total}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  )
}