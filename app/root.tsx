import type {ReactNode} from 'react';
import {Links, Meta, Outlet, isRouteErrorResponse, useRouteError} from 'react-router';
export function Layout({children}: {children: ReactNode}) {
  return <html lang="bg"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,follow"/><Meta/><Links/><style>{'html,body{margin:0;padding:0} [data-m365-landing]{display:block;width:100%}'}</style></head><body>{children}</body></html>;
}
export default function App(){return <Outlet/>;}
export function ErrorBoundary(){const error=useRouteError();return <main style={{padding:32,fontFamily:'Arial'}}><h1>{isRouteErrorResponse(error)&&error.status===404?'Страницата не е намерена':'Временно затруднение'}</h1><a href="https://mashini365.bg/">Към Mashini365 →</a></main>;}
