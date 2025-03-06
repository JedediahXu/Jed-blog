import axios from './axios'

interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
  image: string | null;
  images: string[] | null;
  tags: string[] | null;
  createdOn: number;
  updatedOn: number;
  total: number;
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  userId: string;
  createdOn: number;
}

interface ApiResponse<T = any> {
  data: T;
  source: string;
  total: number;
  executionTime: number;
}

// API 路由配置
const API_ROUTES = {
  posts: '/api/v1/posts',
} as const;

const fetchApi = <T = any>(url: string): Promise<T> => {
  return axios
    .post(url, null, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
}

export const getPosts = () => {
  return fetchApi<ApiResponse<Post[]>>(API_ROUTES.posts)
    .catch(error => {
      console.error('Error fetching posts:', error)
      return { data: [], source: '', total: 0, executionTime: 0 }
    })
}
