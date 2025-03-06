import { API_CONFIG } from './env';

export const getApiUrl = (path: string) => `https://jed-blog-api.pages.dev/api/v1/posts`;

export interface ApiConfig {
  endpoint: string;
  method: string;
}

export const API_ROUTES: Record<string, ApiConfig> = {
  '/api/v1/posts': {
    endpoint: getApiUrl('/posts'),
    method: 'POST'
  },
}; 
