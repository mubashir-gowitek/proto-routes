import { Routes, Route } from 'react-router-dom';
import pages from './routes.js';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import HtmlPage from './components/HtmlPage.jsx';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {pages.map((p) => (
        <Route
          key={p.path}
          path={p.path}
          element={<HtmlPage src={p.file} title={p.title} />}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
