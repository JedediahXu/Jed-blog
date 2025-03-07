/**
 * @file Blog Posts proxy handler
 * @module functions.api.posts
 * @author JedediahXu <https://github.com/JedediahXu>
 */

import { API_CONFIG } from '../../env';

export async function onRequest(context: any) {
  const { request } = context
  const url = new URL(request.url)
  
  // 如果是 OPTIONS 请求，直接返回 CORS 头
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  try {
    // 构建后端 API URL
    const backendUrl = new URL('/api/v1/posts', API_CONFIG.BASE_URL)
    
    // 转发请求到后端
    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`后端返回状态: ${response.status}`)
    }

    const data = await response.json()

    // 返回响应，添加 CORS 头
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
      }
    })
  } catch (error: any) {
    console.error('代理帖子请求时出错:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal Server Error',
        path: url.pathname
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
} 
