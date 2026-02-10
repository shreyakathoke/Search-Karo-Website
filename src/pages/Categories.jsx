import { useEffect, useMemo, useState } from "react";
import "../styles/dashboard.css";
import api from "../api/axios";

export default function Categories() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    role: "Buyer",
    category: "",
    product: "",
    popular: "Positive",
  });

  
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    role: "Buyer",
    category: "",
    product: "",
    popular: "Positive",
  });

  
  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/categories");
        if (!mounted) return;

        const data = (res.data || []).map((item, idx) => ({
          ...item,
          id: item._id || item.id || idx + 1,
          sno: idx + 1,
        }));

        setRows(data);
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Failed to load categories"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const nextSno = useMemo(() => rows.length + 1, [rows.length]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      role: "Buyer",
      category: "",
      product: "",
      popular: "Positive",
    });
  };

  
  const addItem = async (e) => {
    e.preventDefault();
    if (!form.category.trim() || !form.product.trim()) return;

    setSaving(true);
    setError("");

    try {
      const payload = {
        role: form.role,
        category: form.category.trim(),
        product: form.product.trim(),
        popular: form.popular,
      };

      const res = await api.post("/categories", payload);
      const created = res.data;

      const newRow = {
        ...created,
        id: created._id || Date.now(),
        sno: nextSno,
      };

      setRows((prev) => [...prev, newRow]);
      resetForm();

      const modalEl = document.getElementById("addCategoryModal");
      if (modalEl) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();
      }
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to save category"
      );
    } finally {
      setSaving(false);
    }
  };

 
  const openEdit = (row) => {
    setEditId(row._id || row.id);
    setEditForm({
      role: row.role || "Buyer",
      category: row.category || "",
      product: row.product || "",
      popular: row.popular || "Positive",
    });

    const modalEl = document.getElementById("editCategoryModal");
    if (modalEl) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  };

  
  const updateItem = async (e) => {
    e.preventDefault();
    if (!editId) return;

    setSaving(true);
    setError("");

    try {
      const payload = {
        role: editForm.role,
        category: editForm.category.trim(),
        product: editForm.product.trim(),
        popular: editForm.popular,
      };

      const res = await api.put(`/categories/${editId}`, payload);
      const updated = res.data;

      setRows((prev) =>
        prev.map((r) =>
          (r._id || r.id) === editId
            ? { ...r, ...updated } // keep sno
            : r
        )
      );

      const modalEl = document.getElementById("editCategoryModal");
      if (modalEl) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();
      }

      setEditId(null);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update category"
      );
    } finally {
      setSaving(false);
    }
  };

  // ✅ DELETE
  const deleteItem = async (row) => {
    const id = row._id || row.id;
    if (!id) return;

    const ok = window.confirm("Delete this category?");
    if (!ok) return;

    setSaving(true);
    setError("");

    try {
      await api.delete(`/categories/${id}`);

      // Remove row and re-number S.No.
      setRows((prev) =>
        prev
          .filter((r) => (r._id || r.id) !== id)
          .map((r, idx) => ({ ...r, sno: idx + 1 }))
      );
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete category"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid px-4 py-3">
      {/* Header */}
      <div className="row align-items-center mb-3">
        <div className="col"></div>

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

      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* Card */}
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
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                rows.map((r) => (
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

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => openEdit(r)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteItem(r)}
                          type="button"
                          disabled={saving}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MODAL */}
      <div
        className="modal fade"
        id="addCategoryModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-pro">
            <div className="modal-header modal-pro-header">
              <h5 className="modal-title fw-bold">Add Category</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={addItem}>
              <div className="modal-body">
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

                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Product</label>
                  <input
                    className="form-control"
                    name="product"
                    value={form.product}
                    onChange={onChange}
                    required
                  />
                </div>

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
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <div
        className="modal fade"
        id="editCategoryModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-pro">
            <div className="modal-header modal-pro-header">
              
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={updateItem}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={editForm.role}
                    onChange={onEditChange}
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>

                <div classNameName="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    className="form-control"
                    name="category"
                    value={editForm.category}
                    onChange={onEditChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Product</label>
                  <input
                    className="form-control"
                    name="product"
                    value={editForm.product}
                    onChange={onEditChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold">Popular</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="popular"
                        value="Positive"
                        checked={editForm.popular === "Positive"}
                        onChange={onEditChange}
                      />
                      <label className="form-check-label">Positive</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="popular"
                        value="Negative"
                        checked={editForm.popular === "Negative"}
                        onChange={onEditChange}
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
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark" disabled={saving}>
                  {saving ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
