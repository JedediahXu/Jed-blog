import { API_ROUTES, type ApiConfig } from './config';

export async function handleRequest(request: Request, apiPath: string) {
  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  const route = API_ROUTES[apiPath];
  if (!route) {
    return new Response('Not Found', { status: 404 });
  }

  try {
    const response = await fetch(route.endpoint, {
      method: route.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // 如果是 POST 请求，转发请求体
      ...(request.method === 'POST' ? { body: await request.text() } : {})
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API response for ${apiPath}:`, data);

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
      }
    });
  } catch (error: any) {
    console.error(`Error in API function ${apiPath}:`, error);
    return new Response(JSON.stringify({
      error: error.message || 'Unknown error',
      path: apiPath
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
} 
