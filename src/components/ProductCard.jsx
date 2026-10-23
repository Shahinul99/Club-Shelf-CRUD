import { Link } from 'react-router-dom';

export default function ProductCard({ product, onDelete, onAddToCart, readOnly = false }) {
  const { _id, name, price, category, stock, image, description } = product;

  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="h-44 bg-base-300">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm opacity-60">No image</span>
        )}
      </figure>
      <div className="card-body gap-2">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm opacity-70">{category}</p>
        {description && <p className="line-clamp-2 text-sm">{description}</p>}
        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${Number(price).toFixed(2)}</span>
          <span className={`badge ${Number(stock) > 0 ? 'badge-success' : 'badge-error'} badge-soft`}>
            {Number(stock) > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="card-actions mt-2 justify-between">
          <button
            className="btn btn-sm btn-primary"
            disabled={Number(stock) <= 0}
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
          {!readOnly && (
            <div className="flex gap-2">
            <Link to={`/update/${_id}`} className="btn btn-sm btn-outline btn-primary">
              Edit
            </Link>
            <button onClick={() => onDelete(_id)} className="btn btn-sm btn-error">
              Delete
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
