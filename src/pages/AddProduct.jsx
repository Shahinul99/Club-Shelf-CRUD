import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../api.js';
import ProductForm from '../components/ProductForm.jsx';

export default function AddProduct() {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  // CREATE
  const handleAdd = async (product) => {
    setBusy(true);
    try {
      const res = await fetch(`${API}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.insertedId) {
        await Swal.fire({ icon: 'success', title: 'Product added', timer: 1500, showConfirmButton: false });
        navigate('/');
      } else {
        throw new Error('Not inserted');
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Could not add product', text: 'Check the server and try again.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Add product</h1>
      <ProductForm onSubmit={handleAdd} submitLabel="Add product" busy={busy} />
    </div>
  );
}
