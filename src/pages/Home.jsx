import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
import demoProductsData from '../../../server/seed-data.json';
import { useCart } from '../context/CartContext.jsx';

const demoProducts = demoProductsData.map((product, index) => ({
  ...product,
  _id: `demo-${index + 1}`,
}));

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiUnavailable, setApiUnavailable] = useState(false);

  // READ
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Product request failed');
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Invalid product response');
        const productsByName = new Map(demoProducts.map((product) => [product.name.toLowerCase(), product]));
        data.forEach((product) => productsByName.set(product.name.toLowerCase(), product));
        setProducts([...productsByName.values()]);
      })
      .catch(() => {
        setProducts(demoProducts);
        setApiUnavailable(true);
      })
      .finally(() => setLoading(false));
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Delete this product?',
      text: 'This cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d64545',
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API}/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.deletedCount > 0) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        Swal.fire({ icon: 'success', title: 'Product deleted', timer: 1500, showConfirmButton: false });
      } else {
        throw new Error('Nothing deleted');
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Delete failed', text: 'The product was not removed. Try again.' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-lg">No products yet.</p>
        <Link to="/add" className="btn btn-primary">
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Browse products</h1>
          <p className="mt-1 opacity-70">Demo products stay in the catalog alongside products you add.</p>
        </div>
        <Link to="/add" className="btn btn-primary">Add a product</Link>
      </div>
      {apiUnavailable && (
        <p className="mb-4 rounded-lg bg-warning/20 p-3 text-sm">
          The server is unavailable. Demo products are shown; adding, editing, and deleting products requires the server.
        </p>
      )}
      <h2 className="mb-4 text-xl font-semibold">All items ({products.length})</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={handleDelete}
            onAddToCart={addToCart}
            readOnly={String(p._id).startsWith('demo-')}
          />
        ))}
      </div>
    </>
  );
}
