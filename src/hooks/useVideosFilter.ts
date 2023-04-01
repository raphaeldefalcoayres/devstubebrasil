import { VideoModel } from '@/@types'

export const useVideosFilter = () => {
  const filter = ({ videos, search }: { videos: VideoModel[]; search: string }): VideoModel[] => {
    let sanitizedSearchTerm = search.toLowerCase()

    if (sanitizedSearchTerm.endsWith('.js')) {
      sanitizedSearchTerm = sanitizedSearchTerm.substring(0, sanitizedSearchTerm.length - 3)
    }

    const searchTerms = sanitizedSearchTerm.split(' ')

    console.log('sanitizedSearchTerm', sanitizedSearchTerm)
    console.log('searchTerms', searchTerms)

    return videos.filter((video) => {
      const sanitizedTitle = video.title.toLowerCase().replace(/\s+/g, '').replace(/\.js/g, '')
      const sanitizedDescription = video.description.toLowerCase().replace(/\s+/g, '').replace(/\.js/g, '')

      return searchTerms.every((term) => {
        return sanitizedTitle.includes(term) || sanitizedDescription.includes(term)
      })
    })
  }

  return { filter }
}
