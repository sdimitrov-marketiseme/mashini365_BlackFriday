import {renderToReadableStream} from 'react-dom/server.browser';
import {ServerRouter, type EntryContext} from 'react-router';
export default async function handleRequest(request: Request, status: number, headers: Headers, context: EntryContext){
 const stream = await renderToReadableStream(<ServerRouter context={context} url={request.url}/>, {signal:request.signal,onError(error){console.error(error);status=500;}});
 await stream.allReady;
 headers.set('Content-Type','text/html; charset=utf-8');
 return new Response(request.method==='HEAD'?null:stream,{status,headers});
}
