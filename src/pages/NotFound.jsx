import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-200">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p>That address does not match any page in the app.</p>
      <Link to="/" className="btn btn-primary">
        Back to products
      </Link>
    </div>
  );
}
