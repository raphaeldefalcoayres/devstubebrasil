'use client'

import Link from 'next/link'

import { IPropsComponent } from './types'

export function MenuItem({ path, title, isOpen, icon }: IPropsComponent) {
  return (
    <Link
      passHref
      href={path}
      className={`text-white flex ${
        !isOpen && 'flex-col  items-center'
      } relative px-4 hover:bg-gray-900 cursor-pointer mb-4 py-2`}
    >
      <div className={`${isOpen ? 'mr-4' : 'mr-0 mb-2'} my-auto`}>{icon}</div>
      <div className={`flex-auto ${!isOpen && 'text-xs'}`}>
        <span>{title}</span>
      </div>
    </Link>
  )
}
