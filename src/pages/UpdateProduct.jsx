import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../api.js';
import ProductForm from '../components/ProductForm.jsx';

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [busy, setBusy] = useState(false);

  // READ one (pre-fill the form)
  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setProduct)
      .catch(async () => {
        await Swal.fire({ icon: 'error', title: 'Product not found' });
        navigate('/');
      });
  }, [id, navigate]);

  // UPDATE
  const handleUpdate = async (updated) => {
    setBusy(true);
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.matchedCount > 0) {
        await Swal.fire({
          icon: 'success',
          title: data.modifiedCount > 0 ? 'Product updated' : 'No changes to save',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/');
      } else {
        throw new Error('No match');
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Update failed', text: 'The product was not saved. Try again.' });
    } finally {
      setBusy(false);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Edit product</h1>
      <ProductForm initial={product} onSubmit={handleUpdate} submitLabel="Save changes" busy={busy} />
    </div>
  );
}
