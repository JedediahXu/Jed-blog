import type { APIRoute } from 'astro';

const API_URL = import.meta.env.PUBLIC_API_URL;

console.log(API_URL);

export const POST: APIRoute = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/posts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Proxy response:', data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ 
      data: [],
      source: '',
      total: 0,
      executionTime: 0
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 
