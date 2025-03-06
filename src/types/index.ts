// API 响应类型
export interface ApiResponse<T> {
  data: T;
  source: string;
  total: number;
  executionTime: number;
}

// 文章类型
export interface Post {
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

// 评论类型
export interface Comment {
  id: string;
  postId: string;
  content: string;
  userId: string;
  createdOn: number;
}

// 用户类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
} 
