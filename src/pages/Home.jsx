import { Link } from 'react-router-dom';
import pages from '../routes.js';

export default function Home() {
  return (
    <div className="home">
      <header className="home__hero">
        <h1>HTML Routes</h1>
        <p>Each route below mounts a standalone HTML prototype.</p>
      </header>

      <ul className="home__grid">
        {pages.map((p) => (
          <li key={p.path} className="home__card">
            <Link to={p.path} className="home__card-link">
              <span className="home__path">{p.path}</span>
              <span className="home__title">{p.title}</span>
              {p.description && (
                <span className="home__desc">{p.description}</span>
              )}
              <span className="home__cta">Open →</span>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="home__footer">
        Add new prototypes by dropping an HTML file in
        <code> public/pages/</code> and adding an entry to
        <code> src/routes.js</code>.
      </footer>
    </div>
  );
}
