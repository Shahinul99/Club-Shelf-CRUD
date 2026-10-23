import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? 'font-semibold underline decoration-secondary decoration-2 underline-offset-8' : '';

  return (
    <header className="bg-primary text-primary-content">
      <div className="navbar mx-auto max-w-6xl px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Club Shelf
          </Link>
        </div>
        <nav className="flex gap-6">
          <NavLink to="/" end className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/add" className={linkClass}>
            Add product
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
