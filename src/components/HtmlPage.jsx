import { useEffect } from 'react';

export default function HtmlPage({ src, title }) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <iframe
      src={src}
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
