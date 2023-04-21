import Analytics from '@/components/Analytics'

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
      <head>
        <Analytics />
      </head>
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
        <div className="lg:p-4 xl:py-8 xl:px-4 md:h-screen">{children}</div>
      </body>
    </html>
  )
}
