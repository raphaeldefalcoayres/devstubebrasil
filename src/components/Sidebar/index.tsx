'use client'

import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

import { MENU } from './__mocks__/data'
import { MenuItem } from './components/MenuItem'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={`flex-shrink-0 ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-950 `}>
      <div className="flex-auto h-full">
        <div className="flex flex-col">
          <ul className="relative m-0 p-2 list-none h-full">
            <li className="text-white text-2xl p-4 w-full flex relative shadow-sm justify-start mb-4">
              <button type="button" arial-label="Botão para expandir ou retrair o menu" onClick={toggleSidebar}>
                <GiHamburgerMenu />
              </button>
            </li>

            {MENU.map((menu) => (
              <MenuItem key={menu.id} icon={menu.icon} title={menu.title} path={menu.path} isOpen={isOpen} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
