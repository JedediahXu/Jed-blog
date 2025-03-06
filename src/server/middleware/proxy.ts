import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ params, request }) => {
  try {
    const response = await fetch('https://sitedeploy99-blog-api.pages.dev/api/v1/posts');
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}; 
