export interface VideoModel {
  id: string
  channelId: string
  channelTitle: string
  channelLogo: string
  publishTime: string
  videoId: string
  title: string
  description: string
  thumbnail: string
  duration: number
  viewCount: number
  likeCount: number
  commentCount: number
  favoriteCount: number
  positiveVotes: number
  negativeVotes: number
  relevance: number
  tags: string
  topics: string
  type: string
  segment: string
  category: string
  subcategory: string
  position: number
  language: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  name: string
  category: string
  videos: VideoModel[]
}

export interface CarouselProps {
  data: VideoModel[]
  title: string
}
