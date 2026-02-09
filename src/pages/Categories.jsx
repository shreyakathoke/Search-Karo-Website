import { useMemo, useState } from "react";
import "../styles/dashboard.css";

const initialRows = [
  { id: 1, sno: 1, role: "Buyer", category: "Clothes", product: "Jeans", popular: "Positive" },
  { id: 2, sno: 2, role: "Buyer", category: "Mobile", product: "iPhone", popular: "Negative" },
  { id: 3, sno: 3, role: "Seller", category: "Laptop", product: "Dell", popular: "Positive" },
];

export default function Categories() {
  const [rows, setRows] = useState(initialRows);

  const [form, setForm] = useState({
    role: "Buyer",
    category: "",
    product: "",
    popular: "Positive",
  });

  const nextSno = useMemo(() => rows.length + 1, [rows.length]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      role: "Buyer",
      category: "",
      product: "",
      popular: "Positive",
    });
  };

  const addItem = (e) => {
    e.preventDefault();

    if (!form.category.trim() || !form.product.trim()) return;

    const newRow = {
      id: Date.now(),
      sno: nextSno,
      role: form.role,
      category: form.category.trim(),
      product: form.product.trim(),
      popular: form.popular,
    };

    setRows((prev) => [...prev, newRow]);
    resetForm();

    // Close modal properly
    const modalEl = document.getElementById("addCategoryModal");
    if (modalEl) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
    }
  };

  return (
    <div className="container-fluid px-4 py-3">

      {/* ===== HEADER ROW ===== */}
      <div className="row align-items-center mb-3">
        <div className="col">
          
        </div>

        <div className="col-auto">
          <button
            className="btn btn-dark view-btn"
            data-bs-toggle="modal"
            data-bs-target="#addCategoryModal"
            type="button"
          >
            <i className="bi bi-plus-lg me-2" />
            Add
          </button>
        </div>
      </div>

      {/* ===== CARD ===== */}
      <div className="category-page-card">
        <div className="category-page-head">
          <div className="category-page-title">Categories</div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle category-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>S.no.</th>
                <th style={{ width: 160 }}>Role</th>
                <th>Categories</th>
                <th style={{ width: 220 }}>Product</th>
                <th style={{ width: 160 }}>Popular</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.sno}</td>
                  <td>{r.role}</td>
                  <td>{r.category}</td>
                  <td>{r.product}</td>
                  <td>
                    <span
                      className={`pill ${
                        r.popular === "Positive"
                          ? "pill-positive"
                          : "pill-negative"
                      }`}
                    >
                      {r.popular}
                    </span>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      <div
        className="modal fade"
        id="addCategoryModal"
        tabIndex="-1"
        aria-labelledby="addCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-pro">
            <div className="modal-header modal-pro-header">
              <h5 className="modal-title fw-bold" id="addCategoryModalLabel">
                Add Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={addItem}>
              <div className="modal-body">

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={form.role}
                    onChange={onChange}
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="e.g. Clothes"
                    required
                  />
                </div>

                {/* Product */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Product</label>
                  <input
                    className="form-control"
                    name="product"
                    value={form.product}
                    onChange={onChange}
                    placeholder="e.g. Jeans"
                    required
                  />
                </div>

                {/* Popular */}
                <div className="mb-2">
                  <label className="form-label fw-semibold">Popular</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="popular"
                        value="Positive"
                        checked={form.popular === "Positive"}
                        onChange={onChange}
                      />
                      <label className="form-check-label">Positive</label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="popular"
                        value="Negative"
                        checked={form.popular === "Negative"}
                        onChange={onChange}
                      />
                      <label className="form-check-label">Negative</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
