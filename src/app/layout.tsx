import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

import '@/styles/global.css'

export const metadata = {
  title: 'Devstube Brasil',
  description:
    'A DevsTubeBrasil é uma plataforma de conteúdo de alta qualidade feita exclusivamente para desenvolvedores brasileiros. Nossa missão é tornar mais fácil e organizado o acesso a conteúdos relevantes, sem distrações desnecessárias. Descubra vídeos de especialistas da indústria, tutoriais práticos e entrevistas inspiradoras em um só lugar. Junte-se a nossa comunidade apaixonada por tecnologia e aprimore suas habilidades de programação hoje mesmo!',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="relative">
      <body>
        <div className="text-xs font-thin h-fit text-white bg-blue-900 text-center absolute top-0 left-0 w-full px-4">
          <span className="hidden md:block">
            Este é um site <b>beta</b> com alguns dados de vídeos youtube de 2019 a 2023 de categorias como HTML, CSS,
            Javascript, Typescript e outros.
          </span>
          <span className="block md:hidden text-center mx-auto">
            Este é um site <b>beta</b> com alguns dados de vídeos youtube
          </span>
        </div>
        <div className="md:p-8">
          <div className="md:overflow-hidden rounded-xl w-full h-full flex md:flex-row flex-col">
            <Sidebar />
            <div className="flex-1 h-full bg-content flex flex-col gap-4 md:gap-8 md:pr-8 md:pl-8 md:pb-8 p-4">
              <Header />
              <div className="h-full md:flex-1 mt-4">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
