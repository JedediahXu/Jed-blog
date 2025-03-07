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

const API_PATH = '/api/v1/posts'

export const getBlogPosts2 = async (): Promise<PostsResponse> => {
  try {
    const response = await axios.request<PostsResponse>({
      url: API_PATH,  // 使用代理路径
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
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
