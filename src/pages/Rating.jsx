import { useEffect, useMemo, useState } from "react";
import "../styles/dashboard.css";

const STORAGE_KEY = "rating_rows_v1";

const initialRows = [
  { id: 1, sno: 1, category: "Jeans", shop: "Clothes", stars: 4, review: "Positive" },
  { id: 2, sno: 2, category: "iPhone", shop: "Mobile", stars: 3, review: "Negative" },
  { id: 3, sno: 3, category: "Dell", shop: "Laptop", stars: 3, review: "Negative" },
  { id: 4, sno: 4, category: "Boots", shop: "Shoes", stars: 4, review: "Positive" },
  { id: 5, sno: 5, category: "Pizzaria Cafe", shop: "Food", stars: 4, review: "Negative" },
  { id: 6, sno: 6, category: "Wellness Oasis Clinic", shop: "Hospital", stars: 3, review: "Positive" },
];

function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, value));
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < v;
        return (
          <i
            key={i}
            className={`bi ${filled ? "bi-star-fill" : "bi-star"} star-icon`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export default function Rating() {
  // ✅ Load from localStorage first
  const [rows, setRows] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialRows;
  });

  // ✅ Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch {}
  }, [rows]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    category: "",
    shop: "",
    stars: 4,
    review: "Positive",
  });

  const nextSno = useMemo(() => rows.length + 1, [rows.length]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === "stars" ? Number(value) : value }));
  };

  const resetForm = () => {
    setForm({
      category: "",
      shop: "",
      stars: 4,
      review: "Positive",
    });
  };

  // ✅ HARD CLEANUP (removes blur/backdrop)
  const cleanupModalArtifacts = () => {
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
    document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());

    const modalEl = document.getElementById("addRatingModal");
    if (modalEl) {
      modalEl.classList.remove("show");
      modalEl.style.display = "none";
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.removeAttribute("aria-modal");
      modalEl.removeAttribute("role");
    }
  };

  // ✅ Close modal properly + cleanup
  const closeModal = () => {
    const modalEl = document.getElementById("addRatingModal");
    if (modalEl && window.bootstrap?.Modal) {
      const inst = window.bootstrap.Modal.getInstance(modalEl);
      if (inst) inst.hide();
      else window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }
    cleanupModalArtifacts();
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    window.setTimeout(() => setSuccess(""), 3000);
  };

  const addItem = (e) => {
    // ✅ Prevent refresh / redirect
    e.preventDefault();
    e.stopPropagation();

    setError("");
    setSuccess("");

    const cat = form.category.trim();
    const shop = form.shop.trim();

    if (!cat || !shop) {
      setError("Please fill Category and Shop");
      return;
    }

    const newRow = {
      id: Date.now(),
      sno: nextSno,
      category: cat,
      shop: shop,
      stars: form.stars,
      review: form.review,
    };

    setRows((prev) => [...prev, newRow]);
    resetForm();
    closeModal();
    showSuccess("Rating added successfully ✅");
  };

  // ✅ Cleanup on route change/unmount
  useEffect(() => {
    return () => {
      cleanupModalArtifacts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid px-4 py-3">
      {/* Header */}
      <div className="row align-items-center mb-3">
        <div className="col"></div>

        <div className="col-auto">
          <button
            className="btn btn-dark view-btn"
            data-bs-toggle="modal"
            data-bs-target="#addRatingModal"
            type="button"
          >
            <i className="bi bi-plus-lg me-2" />
            Add
          </button>
        </div>
      </div>

      {/* ✅ Alerts */}
      {success && <div className="alert alert-success py-2">{success}</div>}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* Card */}
      <div className="rating-page-card">
        <div className="rating-page-head">
          <div className="rating-page-title">Rating</div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle rating-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>S.no.</th>
                <th>Categories</th>
                <th style={{ width: 220 }}>Shop</th>
                <th style={{ width: 220 }}>Rating</th>
                <th style={{ width: 200 }}>Review</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.sno}</td>
                  <td>{r.category}</td>
                  <td>{r.shop}</td>
                  <td>
                    <Stars value={r.stars} />
                  </td>
                  <td>
                    <span
                      className={`pill-2 ${
                        r.review === "Positive" ? "pill2-positive" : "pill2-negative"
                      }`}
                    >
                      {r.review}{" "}
                      <span className="pill-arrow">{r.review === "Positive" ? "↑" : "↓"}</span>
                    </span>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No ratings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="addRatingModal"
        tabIndex="-1"
        aria-labelledby="addRatingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-pro">
            <div className="modal-header modal-pro-header">
              <h5 className="modal-title fw-bold" id="addRatingModalLabel">
                Add Rating
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cleanupModalArtifacts}
              />
            </div>

            <form onSubmit={addItem} noValidate>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="e.g. Jeans"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Shop</label>
                  <input
                    className="form-control"
                    name="shop"
                    value={form.shop}
                    onChange={onChange}
                    placeholder="e.g. Clothes"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Rating (Stars)</label>
                  <select className="form-select" name="stars" value={form.stars} onChange={onChange}>
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold">Review</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="review"
                        value="Positive"
                        checked={form.review === "Positive"}
                        onChange={onChange}
                      />
                      <label className="form-check-label">Positive</label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="review"
                        value="Negative"
                        checked={form.review === "Negative"}
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
                  onClick={cleanupModalArtifacts}
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
      {/* End Modal */}
    </div>
  );
}
