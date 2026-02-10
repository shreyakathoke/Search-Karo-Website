import { useEffect, useMemo, useState } from "react";
import { Modal } from "bootstrap";
import "../styles/dashboard.css";
import api from "../api/axios";

export default function Categories() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    role: "Buyer",
    category: "",
    product: "",
    popular: "Positive",
  });

  // --- helpers ---
  const normalizeRow = (item, idx = 0) => {
    const _id = item?._id ?? item?.id ?? null;
    return {
      ...item,
      _id,
      id: _id || item?.id || `tmp-${idx}-${Date.now()}`,
      sno: idx + 1,
      role: item?.role ?? "Buyer",
      category: item?.category ?? item?.categories ?? "",
      product: item?.product ?? "",
      popular: item?.popular ?? item?.isPopular ?? "Positive",
    };
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    window.setTimeout(() => setSuccess(""), 3000);
  };

  const showError = (err, fallback = "Something went wrong") => {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      fallback;
    setError(msg);
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/categories");
      const list = Array.isArray(res.data) ? res.data : [];
      setRows(list.map((item, idx) => normalizeRow(item, idx)));
    } catch (err) {
      showError(err, "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // LOAD
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSno = useMemo(() => rows.length + 1, [rows.length]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      role: "Buyer",
      category: "",
      product: "",
      popular: "Positive",
    });
  };

  // OPEN ADD MODAL
  const openAddModal = () => {
    resetForm();
    setError("");
    setSuccess("");

    const modalEl = document.getElementById("addCategoryModal");
    if (!modalEl) return;

    Modal.getOrCreateInstance(modalEl).show();
  };

  // ADD ITEM
  const addItem = async (e) => {
    e.preventDefault();
    if (!form.category.trim() || !form.product.trim()) return;

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      role: form.role,
      category: form.category.trim(),
      product: form.product.trim(),
      popular: form.popular,
    };

    // ✅ optimistic row (so UI shows instantly)
    const optimistic = {
      ...payload,
      id: `tmp-${Date.now()}`,
      _id: null,
      sno: nextSno,
    };
    setRows((prev) => [...prev, optimistic]);

    try {
      const res = await api.post("/categories", payload);
      const created = res.data || payload;

      // close modal
      const modalEl = document.getElementById("addCategoryModal");
      if (modalEl) Modal.getOrCreateInstance(modalEl).hide();

      resetForm();
      showSuccess("Category added successfully ✅");

      // ✅ re-fetch so UI = DB always (fixes “not shown” issues)
      await fetchCategories();
    } catch (err) {
      // rollback optimistic add if failed
      setRows((prev) => prev.filter((r) => r.id !== optimistic.id));
      showError(err, "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  // DELETE ITEM
  const deleteItem = async (row) => {
    const id = row?._id || row?.id;
    if (!id) return;

    const ok = window.confirm("Delete this category?");
    if (!ok) return;

    setSaving(true);
    setError("");
    setSuccess("");

    // optimistic remove
    const backup = rows;
    setRows((prev) =>
      prev
        .filter((r) => (r._id || r.id) !== id)
        .map((r, idx) => ({ ...r, sno: idx + 1 }))
    );

    try {
      await api.delete(`/categories/${id}`);
      showSuccess("Category deleted successfully ✅");
      await fetchCategories();
    } catch (err) {
      // rollback
      setRows(backup);
      showError(err, "Failed to delete category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid px-4 py-3">
      {/* Header */}
      <div className="row align-items-center mb-3">
        <div className="col" />
        <div className="col-auto">
          <button
            className="btn btn-dark view-btn"
            type="button"
            onClick={openAddModal}
          >
            <i className="bi bi-plus-lg me-2" />
            Add
          </button>
        </div>
      </div>

      {/* Alerts */}
      {success && <div className="alert alert-success py-2">{success}</div>}
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
                disabled={saving}
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
    </div>
  );
}
