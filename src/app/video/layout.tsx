import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export const dynamic = 'force-static'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden h-full grid template">
      <Sidebar />
      <div className="video-content bg-content p-4 xl:p-8 overflow-x-hidden overflow-y-auto grid gap-4 xl:gap-6">
        <Header />
        {children}
      </div>
    </div>
  )
}
