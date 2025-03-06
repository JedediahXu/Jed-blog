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

interface ApiResponse {
  data: Post[];
  source: string;
  total: number;
  executionTime: number;
}

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
  // 使用本地代理端点，不要直接访问外部 API
  return fetchApi<ApiResponse>('https://sitedeploy99-blog-api.pages.dev/api/v1/posts')
    .catch(error => {
      console.error('Error fetching posts:', error)
      return { data: [], source: '', total: 0, executionTime: 0 }
    })
}
