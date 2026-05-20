import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>That route does not exist.</p>
      <Link to="/">← Back home</Link>
    </div>
  );
}
