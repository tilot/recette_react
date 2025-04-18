import { Link } from 'react-router-dom';
// import './Header.css';
import "../../assets/css/style.css"; // Importation du CSS global

export default function Header() {
  return (
    <header className="container mt-4 mb-4">
      <Link to="/" className="header-link">
        <div className="site-logo">
          <img className="site-logo" alt="Site logo" src="/assets/img/logo.svg" />
        </div>
        <h1 className="site-title">Les grands plats</h1>
      </Link>
    </header>
  );
}
