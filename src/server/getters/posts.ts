/**
 * @file Blog Posts getter
 * @module server.getter.posts
 * @author JedediahXu <https://github.com/JedediahXu>
 */

import axios from '../services/axios'

export interface Post {
  id: string
  title: string
  body: string
  userId: string
  image: string | null
  images: string[] | null
  tags: string[] | null
  createdOn: number
  updatedOn: number
}

export interface PostsResponse {
  data: Post[]
  source: string
  total: number
  executionTime: number
}

const BLOG_API_BASE = 'https://jed-blog-api.pages.dev'

let cachedPosts: PostsResponse | null = null
const CACHE_TIME = 5 * 60 * 1000 // 5分钟缓存
let lastFetchTime = 0

export const getBlogPosts = async (): Promise<PostsResponse> => {
  // 如果有缓存且未过期，直接返回缓存
  if (cachedPosts && (Date.now() - lastFetchTime < CACHE_TIME)) {
    return cachedPosts
  }

  try {
    const response = await axios.request<PostsResponse>({
      url: `${BLOG_API_BASE}/api/v1/posts`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    // 更新缓存
    cachedPosts = response.data
    lastFetchTime = Date.now()
    
    return response.data
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    // 返回空数据结构而不是抛出错误，这样页面仍然可以渲染
    return {
      data: [],
      source: 'd1',
      total: 0,
      executionTime: 0
    }
  }
}
