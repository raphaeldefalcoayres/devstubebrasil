'use client'

import Link from 'next/link'
import { useState } from 'react'

type MenuSubTabsProps = {
  data: any
  videos: VideoModel[]
  categorySelected?: string
  subcategorySelected?: string
}

export default function MenuSubTabs({ data, videos, categorySelected, subcategorySelected }: MenuSubTabsProps) {
  const [selectedTab, setSelectedTab] = useState(subcategorySelected)
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
    <div className="">
      <ul className="menu-container">
        <Link
          href={`/${categorySelected}`}
          className={`menu-item text-xs ${selectedTab === '' ? 'text-white bg-blue-600' : ''}`}
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
            className={`menu-item text-xs ${selectedTab === option.name ? 'text-white bg-blue-600' : ''}`}
            onClick={() => setSelectedTab(option.name)}
          >
            <span className="uppercase whitespace-nowrap">{option.name}</span>
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
