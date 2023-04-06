import { categoryOrder } from '@/constants'

export const useVideosFilter = () => {
  const filter = ({ videos, search }: { videos: VideoModel[]; search: string }): VideoModel[] => {
    let sanitizedSearchTerm = search.toLowerCase()

    if (categoryOrder.includes(sanitizedSearchTerm)) {
      return videos.filter((video) => video.category === sanitizedSearchTerm)
    }

    if (sanitizedSearchTerm.endsWith('.js')) {
      sanitizedSearchTerm = sanitizedSearchTerm.substring(0, sanitizedSearchTerm.length - 3)
    }

    const searchTerms = sanitizedSearchTerm.split(' ')

    const filteredVideos = videos.filter((video) => {
      const sanitizedTitle = video.title.toLowerCase().replace(/\s+/g, '').replace(/\.js/g, '')
      // const sanitizedDescription = video.description.toLowerCase().replace(/\s+/g, '').replace(/\.js/g, '')

      return searchTerms.every((term) => {
        return sanitizedTitle.includes(term)
        // || sanitizedDescription.includes(term)
      })
    })

    return filteredVideos
  }

  return { filter }
}
