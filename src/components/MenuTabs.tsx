'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Totals } from '@/@types/totals'
import { categoryOrder } from '@/constants'

type MenuTabsProps = {
  data: Totals
  selected?: string
}

interface CategoryCount {
  name: string
  total: number
}

export default function MenuTabs({ data, selected }: MenuTabsProps) {
  const [selectedTab, setSelectedTab] = useState(selected)

  // const singleVideos = data.filter(
  //   (video) => video.type === 'single' || (video.type === 'list' && video.position === 1)
  // )

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
            {data.totalGeral}
          </span>
        </Link>
        {data &&
          data.totalPorCategoria &&
          Object.entries(data.totalPorCategoria).map(([name, total]) => {
            return (
              <Link
                href={`/${name}`}
                key={name}
                className={`menu-item ${
                  selectedTab?.toLowerCase() === name.toLowerCase()
                    ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : ''
                }`}
                onClick={() => setSelectedTab(name)}
              >
                <span className="uppercase whitespace-nowrap">{name}</span>
                <span
                  className={` text-sm py-1 px-2 rounded-lg ${
                    selectedTab === name ? 'text-white bg-blue-500' : 'text-gray-800 bg-white/30'
                  } ml-2`}
                >
                  {total}
                </span>
              </Link>
            )
          })}
      </ul>
    </div>
  )
}
