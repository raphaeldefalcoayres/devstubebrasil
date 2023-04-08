'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function Header() {
  const search = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string | null>(search ? search.get('q') : '')
  const router = useRouter()
  const pathname = usePathname()

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()

    if (typeof searchQuery !== 'string') {
      return
    }

    const encodedSearchQuery = encodeURI(searchQuery)
    router.push(`${pathname}?q=${encodedSearchQuery}`)
  }

  return (
    <div className="w-full flex relative">
      <div className="absolute flex items-center justify-center w-full">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="w-5 h-5 absolute left-5 top-2" />
          <form onSubmit={onSearch}>
            <input
              type="text"
              className="w-full bg-background px-6 pl-12 py-1.5 text-primary_light rounded-xl"
              placeholder="Busque por categoria ou título..."
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </form>
        </div>
      </div>
      {/* <div className="ml-auto flex gap-8 items-center">
        <button className="bg-blue-500 rounded-xl py-2 px-6 text-white cursor-pointer hover:bg-blue-600">
          Cadastrar
        </button>
        <button className="rounded-xl py-2 px-6 text-blue-500 cursor-pointer hover:bg-blue-600">Entrar</button>
      </div> */}
    </div>
  )
}
