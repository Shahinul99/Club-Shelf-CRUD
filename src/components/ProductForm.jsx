export default function ProductForm({ initial = {}, onSubmit, submitLabel, busy }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    onSubmit({
      name: f.get('name').trim(),
      category: f.get('category').trim(),
      price: Number(f.get('price')),
      stock: Number(f.get('stock')),
      image: f.get('image').trim(),
      description: f.get('description').trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text mb-1">Product name</span>
            <input name="name" defaultValue={initial.name} required className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Category</span>
            <input name="category" defaultValue={initial.category} required className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Price (USD)</span>
            <input name="price" type="number" step="0.01" min="0" defaultValue={initial.price} required className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Stock</span>
            <input name="stock" type="number" min="0" defaultValue={initial.stock} required className="input input-bordered w-full" />
          </label>
        </div>
        <label className="form-control">
          <span className="label-text mb-1">Image URL</span>
          <input name="image" type="url" defaultValue={initial.image} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1">Description</span>
          <textarea name="description" defaultValue={initial.description} rows="3" className="textarea textarea-bordered w-full" />
        </label>
        <button type="submit" disabled={busy} className="btn btn-primary">
          {busy ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
