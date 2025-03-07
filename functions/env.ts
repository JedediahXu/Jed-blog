// API 配置
export const API_CONFIG = {
  BASE_URL: 'https://jed-blog-api.pages.dev',
  VERSION: 'v1',
  TIMEOUT: 30000,
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
} as const; 
