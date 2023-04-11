'use client'

import { FaYoutube } from 'react-icons/fa'
import { BiHomeAlt2 } from 'react-icons/bi'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className={`sidebar bg-sidebar flex md:flex-col items-center p-4 lg:items-center lg:py-4`}>
      <Link href="/" className="md:mb-4 flex items-center gap-2">
        <FaYoutube className="text-blue-500 w-8 h-8" />
      </Link>
      <div className="md:flex-1 flex md:flex-col justify-start md:justify-center gap-4 ml-auto md:ml-0">
        <Link href={'/'} className={`text-primary_light/50 hover:text-primary_light`} data-tooltip="Home" title="Home">
          <BiHomeAlt2 className="w-6 h-6" />
        </Link>
        {/* <button
          className={`text-primary_light/50 hover:text-primary_light`}
          data-tooltip="Cursos"
          title="Cursos"
        >
          <RiPlayList2Fill className="w-6 h-6" /> {open && <strong className="hidden md:flex">Cursos</strong>}
        </button> */}
      </div>
    </div>
  )
}
