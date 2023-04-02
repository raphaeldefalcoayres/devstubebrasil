'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FaSearch, FaYoutube } from 'react-icons/fa'

const SearchInput = () => {
  const search = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string | null>(search ? search.get('q') : '')
  const router = useRouter()

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()

    if (typeof searchQuery !== 'string') {
      return
    }

    const encodedSearchQuery = encodeURI(searchQuery)
    router.push(`/search?q=${encodedSearchQuery}`)
  }

  return (
    <div className="fixed w-full flex flex-col z-40">
      <div className="w-full text-xs font-thin text-white bg-blue-900 py-1 text-center">
        Este é um site <b>beta</b> com alguns dados de vídeos youtube de 2019 a 2023 de categorias como HTML, CSS,
        Javascript, Typescript e outros.
      </div>
      <div className="w-full flex items-center justify-between py-3 px-6 bg-[#070913]">
        <Link href={'/'} className="flex gap-2 items-center">
          <FaYoutube className="w-10 h-10 text-[#394894]" />{' '}
          <strong className="text-xl md:flex hidden">DEVSTUBE BRASIL</strong>
        </Link>
        <div className="flex relative items-center gap-2 md:w-80">
          <form onSubmit={onSearch} className="flex justify-center w-full">
            <input
              type="text"
              value={searchQuery || ''}
              className="w-full bg-[#020305] px-4 py-1 md:py-2 pr-4 rounded-tl-xl rounded-bl-xl"
              placeholder="Busque aqui..."
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              title="clique para buscar"
              className="absolute right-0 top-0 bg-blue-900 hover:bg-blue-800 px-2 md:px-4 h-full rounded-tr-xl rounded-br-xl"
              type="submit"
            >
              <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </form>
        </div>
        <div className="flex gap-3">
          {/* {user?.name && (
            <>
              <div className="relative rounded-full w-10 h-10 overflow-hidden">
                <Image fill src={user.thumb!} alt="foto de perfil no header" />
              </div>
              <button onClick={handleLogout} className="flex items-center gap-1">
                <FiLogOut /> Sair
              </button>
            </>
          )} */}
          {/* {!user.name && <button>Entrar</button>} */}
        </div>
      </div>
    </div>
  )
}

export default SearchInput
