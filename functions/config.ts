import { API_CONFIG } from './env';

export const getApiUrl = (path: string) => `${API_CONFIG.BASE_URL}/api/${API_CONFIG.VERSION}${path}`;

export interface ApiConfig {
  endpoint: string;
  method: string;
}

export const API_ROUTES: Record<string, ApiConfig> = {
  '/api/v1/posts': {
    endpoint: getApiUrl('/posts'),
    method: 'POST'
  }
}; 
