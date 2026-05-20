import { useEffect } from 'react';

export default function HtmlPage({ src, title }) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  // Honor the deploy sub-path (BASE_URL is e.g. "/proto-routes/" in prod, "/" in dev).
  // `src` is stored in routes.js as a root-relative path like "/pages/foo.html".
  const baseUrl = import.meta.env.BASE_URL;
  const resolvedSrc = src.startsWith('/')
    ? baseUrl.replace(/\/$/, '') + src
    : src;

  return (
    <iframe
      src={resolvedSrc}
      title={title}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
        background: '#fff',
      }}
    />
  );
}
