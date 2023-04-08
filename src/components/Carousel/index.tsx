'use client'

// EXEMPLO 1
// import { useEffect, useRef, useState } from 'react'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { useTransition, animated, config, useSpring } from 'react-spring'

// import VideoCard from '../VideoCard'
// import { buildCategories } from '@/utils/buildCategories'
// import { CarouselProps, Category, VideoModel } from '@/@types'
// import { ITotalsByCategory } from './types'

// const Carousel = ({ data, title }: CarouselProps) => {
//   const [currentPage, setCurrentPage] = useState(0)
//   const [hasNextPage, setHasNextPage] = useState(false)
//   const [hasPreviousPage, setHasPreviousPage] = useState(false)
//   const [thumbsVideosData, setThumbsVideosData] = useState<Category[]>([])
//   const [_, setTotalsByCategory] = useState<ITotalsByCategory>()

//   const prev = useRef<number>(0)

//   const handleNextPage = () => {
//     if (hasNextPage) {
//       prev.current = currentPage
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const handlePreviousPage = () => {
//     if (hasPreviousPage) {
//       prev.current = currentPage
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   useEffect(() => {
//     const totalsByCategory: ITotalsByCategory = {}

//     data.forEach((item) => {
//       if (totalsByCategory[item.category]) {
//         totalsByCategory[item.category] += 1
//       } else {
//         totalsByCategory[item.category] = 1
//       }
//     })

//     setTotalsByCategory(totalsByCategory)
//   }, [])

//   useEffect(() => {
//     const categories = buildCategories(data)
//     setThumbsVideosData(categories)
//     setHasNextPage(currentPage < categories.length - 1)
//     setHasPreviousPage(currentPage > 0)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage])

//   const transitions = useTransition(thumbsVideosData[currentPage]?.videos, {
//     from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
//     enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
//     leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
//   })

//   return (
//     <div className="flex flex-col w-full">
//       <div className="w-full flex items-center justify-between">
//         <h2 className="mb-4 font-semibold text-xl uppercase flex items-center gap-2">{title}</h2>
//         <div>
//           <button className="disabled:opacity-50" disabled={!hasPreviousPage} onClick={handlePreviousPage}>
//             <FaChevronLeft className="w-6 h-6" />
//           </button>
//           <button className="disabled:opacity-50" disabled={!hasNextPage} onClick={handleNextPage}>
//             <FaChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//       <div className="w-full flex-wrap grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-6 4xl:grid-cols-7 md:gap-8 gap-4 relative">
//         {transitions((style, item) => (
//           <animated.div key={item.videoId} style={style}>
//             <VideoCard video={item} />
//           </animated.div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export { Carousel }

// Exemplo 2
import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSpring, animated, config } from 'react-spring'

import VideoCard from '../VideoCard'
import { buildCategories } from '@/utils/buildCategories'
import { CarouselProps, Category, VideoModel } from '@/@types'
import { ITotalsByCategory } from './types'

const Carousel = ({ data, title }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [thumbsVideosData, setThumbsVideosData] = useState<Category[]>([])
  const [_, setTotalsByCategory] = useState<ITotalsByCategory>()

  const prev = useRef<number>(0)

  const handleNextPage = () => {
    if (hasNextPage) {
      prev.current = currentPage
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      prev.current = currentPage
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    const totalsByCategory: ITotalsByCategory = {}

    data.forEach((item) => {
      if (totalsByCategory[item.category]) {
        totalsByCategory[item.category] += 1
      } else {
        totalsByCategory[item.category] = 1
      }
    })

    setTotalsByCategory(totalsByCategory)
  }, [])

  useEffect(() => {
    const categories = buildCategories(data)
    setThumbsVideosData(categories)
    setHasNextPage(currentPage < categories.length - 1)
    setHasPreviousPage(currentPage > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const thumbsStyle = useSpring({
    from: {
      transform: `translate3d(${-prev.current * 100}%, 0, 0)`, // Adicionando o slide anterior à animação
    },
    to: {
      transform: `translate3d(${-currentPage * 100}%, 0, 0)`, // Usando a posição atual do slide
    },
    config: config.slow, // Configurando a velocidade da animação
  })

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center justify-between">
        <h2 className="mb-4 font-semibold text-xl uppercase flex items-center gap-2">{title}</h2>
        <div>
          <button className="disabled:opacity-50" disabled={!hasPreviousPage} onClick={handlePreviousPage}>
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button className="disabled:opacity-50" disabled={!hasNextPage} onClick={handleNextPage}>
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <animated.div
        className="w-full flex-wrap grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-6 4xl:grid-cols-7 md:gap-8 gap-4 relative"
        style={thumbsStyle}
      >
        {thumbsVideosData[currentPage]?.videos.map((video: VideoModel) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </animated.div>
    </div>
  )
}

export { Carousel }
