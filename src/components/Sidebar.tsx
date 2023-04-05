'use client'

import { FaYoutube } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { BiHomeAlt2 } from 'react-icons/bi'
import { RiPlayList2Fill } from 'react-icons/ri'
import { useState } from 'react'
import Link from 'next/link'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`md:h-full w-full bg-sidebar md:p-6 p-4 flex md:flex-col items-center gap-4 ${
        open ? 'md:w-36' : 'md:w-auto'
      }`}
    >
      <Link href="/" className="md:mb-4">
        <FaYoutube className="text-blue-500 w-8 h-8" />
      </Link>
      <button
        className={`text-primary_light/50 hover:text-primary_light hidden ${open ? 'md:flex' : 'md:flex md:tooltip'} `}
        data-tooltip="Expandir menu"
        title="Expandir menu"
        onClick={() => setOpen(!open)}
      >
        <FiMenu className="w-6 h-6" />
      </button>
      <div className="md:flex-1 flex md:flex-col justify-start md:justify-center gap-4 ml-auto md:ml-0">
        <Link
          href={'/'}
          className={`text-primary_light/50 hover:text-primary_light ${open ? 'flex gap-2' : 'tooltip'} `}
          data-tooltip="Home"
          title="Home"
        >
          <BiHomeAlt2 className="w-6 h-6" /> {open && <strong className="hidden md:flex">Home</strong>}
        </Link>
        <button
          className={`text-primary_light/50 hover:text-primary_light ${open ? 'flex gap-2' : 'tooltip'} `}
          data-tooltip="Cursos"
          title="Cursos"
        >
          <RiPlayList2Fill className="w-6 h-6" /> {open && <strong className="hidden md:flex">Cursos</strong>}
        </button>
      </div>
    </div>
  )
}
