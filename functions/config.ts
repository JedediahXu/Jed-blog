import { API_CONFIG } from './env';

export const getApiUrl = (path: string) => `${API_CONFIG.BASE_URL}/api/v1/${path}`;

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
