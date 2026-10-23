import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="py-20 text-center">
        <h1 className="mb-3 text-3xl font-bold">Your cart is empty</h1>
        <p className="mb-6 opacity-70">Browse the catalog and add something you like.</p>
        <Link to="/" className="btn btn-primary">Browse products</Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Shopping cart</h1>
          <p className="mt-1 opacity-70">{items.length} product types</p>
        </div>
        <Link to="/" className="btn btn-outline btn-primary">Continue shopping</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <article key={product._id} className="card card-side bg-base-100 shadow-sm">
              <figure className="w-28 shrink-0 bg-base-300 sm:w-40">
                {product.image && <img src={product.image} alt={product.name} className="h-full w-full object-cover" />}
              </figure>
              <div className="card-body gap-2 p-4 sm:p-6">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-sm opacity-70">{product.category}</p>
                <p className="font-semibold">${Number(product.price).toFixed(2)} each</p>
                <div className="card-actions items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    Qty
                    <input
                      aria-label={`Quantity for ${product.name}`}
                      className="input input-bordered input-sm w-20"
                      type="number"
                      min="1"
                      max={Number(product.stock) || 1}
                      value={quantity}
                      onChange={(event) => updateQuantity(product._id, Number(event.target.value))}
                    />
                  </label>
                  <button className="btn btn-ghost btn-sm text-error" onClick={() => removeFromCart(product._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="card h-fit bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Order summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <p className="text-xs opacity-60">Demo cart only; checkout is not enabled.</p>
            <Link to="/" className="btn btn-primary mt-2">Keep shopping</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
