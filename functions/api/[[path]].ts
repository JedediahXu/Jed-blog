import { handleRequest } from '../_middleware';

export async function onRequest(context: any) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 如果是 OPTIONS 请求或 API 路由存在，使用 middleware 处理
  if (request.method === 'OPTIONS' || path.startsWith('/api/v1/')) {
    return handleRequest(request, path);
  }

  // 对于其他请求返回 404
  return new Response('Not Found', { status: 404 });
} 
