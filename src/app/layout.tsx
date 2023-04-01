import Header from '@/components/Header'
import '@/styles/global.css'

export const metadata = {
  title: 'Devstube Brasil',
  description:
    'A DevsTubeBrasil é uma plataforma de conteúdo de alta qualidade feita exclusivamente para desenvolvedores brasileiros. Nossa missão é tornar mais fácil e organizado o acesso a conteúdos relevantes, sem distrações desnecessárias. Descubra vídeos de especialistas da indústria, tutoriais práticos e entrevistas inspiradoras em um só lugar. Junte-se a nossa comunidade apaixonada por tecnologia e aprimore suas habilidades de programação hoje mesmo!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div>
          <Header />
          <div className="pt-20">{children}</div>
        </div>
      </body>
    </html>
  )
}
