import {createRequestHandler, RouterContextProvider} from 'react-router';
// This campaign is read-only. It does not create sessions or call the product API.
const handle = createRequestHandler(() => import('virtual:react-router/server-build'), 'production');
export default {
  async fetch(request: Request): Promise<Response> {
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method not allowed', {status: 405, headers: {Allow: 'GET, HEAD'}});
    }
    const response = await handle(request, new RouterContextProvider());
    response.headers.set('X-Robots-Tag', 'noindex, follow');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response;
  },
};
