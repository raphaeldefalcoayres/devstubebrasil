'use client'

import Link from 'next/link'
import { useState } from 'react'

type MenuOption = {
  name: string
  label: string
}

type MenuTabsProps = {
  menuOptions: MenuOption[]
  selected?: string
}

export default function MenuTabs({ menuOptions, selected }: MenuTabsProps) {
  const [selectedTab, setSelectedTab] = useState(selected)

  return (
    <div className="h-[54px] text-sm font-medium text-center text-primary_light border-b border-primary_light dark:text-gray-400 dark:border-gray-700">
      <ul className="flex md:flex-wrap -mb-px overflow-x-auto">
        {menuOptions.map((option) => (
          <Link
            href={`/search?q=${option.name}`}
            key={option.name}
            className={`flex-1 text-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
              selectedTab === option.name
                ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                : ''
            }`}
            onClick={() => setSelectedTab(option.name)}
          >
            {option.label}
          </Link>
        ))}
      </ul>
    </div>
  )
}
