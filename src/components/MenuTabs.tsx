'use client'

import { categoryOrder } from '@/constants'
import Link from 'next/link'
import { useState } from 'react'

type MenuTabsProps = {
  data: VideoModel[]
  selected?: string
}

interface CategoryCount {
  name: string
  total: number
}

export default function MenuTabs({ data, selected }: MenuTabsProps) {
  const [selectedTab, setSelectedTab] = useState(selected)

  const singleVideos = data.filter(
    (video) => video.type === 'single' || (video.type === 'list' && video.position === 1)
  )

  const menuOptions: CategoryCount[] = Object.entries(
    singleVideos.reduce((accumulator: Record<string, number>, currentValue: VideoModel) => {
      const category: string = currentValue.category
      if (!accumulator[category]) {
        accumulator[category] = 1
      } else {
        accumulator[category] += 1
      }
      return accumulator
    }, {})
  )
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => {
      const orderMap: Record<string, number> = {}
      categoryOrder.forEach((category, index) => {
        orderMap[category] = index
      })
      return orderMap[a.name] - orderMap[b.name]
    })

  return (
    <div className="w-full flex text-sm font-medium text-center text-primary_light border-b border-primary_light dark:text-gray-400 dark:border-gray-700">
      <ul className="menu-container">
        <Link
          href={`/`}
          className={`menu-item ${
            selectedTab === '' ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500' : ''
          }`}
          onClick={() => setSelectedTab('')}
        >
          <span className="uppercase">Todos</span>
          <span
            className={` text-sm py-1 px-2 rounded-lg ${
              selectedTab === '' ? 'text-white bg-blue-500' : 'text-gray-800 bg-white/30'
            } ml-2`}
          >
            {data.length}
          </span>
        </Link>

        {menuOptions.map((option) => (
          <Link
            href={`/${option.name}`}
            key={option.name}
            className={`menu-item ${
              selectedTab?.toLowerCase() === option.name.toLowerCase()
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                : ''
            }`}
            onClick={() => setSelectedTab(option.name)}
          >
            <span className="uppercase whitespace-nowrap">{option.name}</span>
            <span
              className={` text-sm py-1 px-2 rounded-lg ${
                selectedTab === option.name ? 'text-white bg-blue-500' : 'text-gray-800 bg-white/30'
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
