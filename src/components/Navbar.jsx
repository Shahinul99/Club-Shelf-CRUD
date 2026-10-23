import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { items } = useCart();
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const linkClass = ({ isActive }) =>
    `whitespace-nowrap ${isActive ? 'font-semibold underline decoration-secondary decoration-2 underline-offset-8' : ''}`;

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-content shadow-md">
      <div className="navbar mx-auto max-w-6xl flex-wrap gap-y-2 px-4">
        <div className="flex-1">
          <Link to="/" className="whitespace-nowrap text-xl font-bold tracking-tight">
            Club Shelf
          </Link>
        </div>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-4 sm:gap-6">
          <NavLink to="/" end className={linkClass}>
            Home / Products
          </NavLink>
          <NavLink to="/add" className={linkClass}>
            Add product
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart ({cartCount})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
