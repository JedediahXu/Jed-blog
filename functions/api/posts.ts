import { handleRequest } from '../_middleware';

export async function onRequest(context: any) {
  return handleRequest(context.request, '/api/v1/posts');
} 
