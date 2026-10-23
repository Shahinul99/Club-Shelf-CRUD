import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // READ
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() =>
        Swal.fire({
          icon: 'error',
          title: 'Could not load products',
          text: 'Check that the server is running and try again.',
        })
      )
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
      <h1 className="mb-6 text-2xl font-bold">Products ({products.length})</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
