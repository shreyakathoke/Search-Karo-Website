import { useEffect, useMemo, useState } from "react";
import "../styles/dashboard.css";

const STORAGE_KEY = "location_rows_v1";

const initialRows = [
  { id: 1, sno: 1, role: "Buyer", location: "London", region: "Europe", popular: "Positive" },
  { id: 2, sno: 2, role: "Buyer", location: "Mumbai", region: "Asia", popular: "Negative" },
  { id: 3, sno: 3, role: "Seller", location: "Berlin", region: "Europe", popular: "Positive" },
  { id: 4, sno: 4, role: "Buyer", location: "Toronto", region: "North America", popular: "Positive" },
  { id: 5, sno: 5, role: "Buyer", location: "Paris", region: "Europe", popular: "Negative" },
  { id: 6, sno: 6, role: "Seller", location: "Berlin", region: "Europe", popular: "Positive" },
];

export default function Location() {
  // ✅ Load from localStorage
  const [rows, setRows] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialRows;
  });

  // ✅ Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch {}
  }, [rows]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    role: "Buyer",
    location: "",
    region: "",
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
      location: "",
      region: "",
      popular: "Positive",
    });
  };

  // ✅ HARD CLEANUP (removes blur/backdrop)
  const cleanupModalArtifacts = () => {
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
    document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());

    const modalEl = document.getElementById("addLocationModal");
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
    const modalEl = document.getElementById("addLocationModal");
    if (modalEl && window.bootstrap?.Modal) {
      const inst = window.bootstrap.Modal.getInstance(modalEl);
      if (inst) inst.hide();
      else window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }

    // Always cleanup to avoid blur
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

    const loc = form.location.trim();
    const reg = form.region.trim();

    if (!loc || !reg) {
      setError("Please fill Location and Region");
      return;
    }

    const newRow = {
      id: Date.now(),
      sno: nextSno,
      role: form.role,
      location: loc,
      region: reg,
      popular: form.popular,
    };

    setRows((prev) => [...prev, newRow]);
    resetForm();

    closeModal(); // ✅ this prevents blur
    showSuccess("Location added successfully ✅");
  };

  // ✅ IMPORTANT: Cleanup on page unmount / route change
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
        <div className="col" />
        <div className="col-auto d-flex gap-2">
          <button
            className="btn btn-dark view-btn"
            data-bs-toggle="modal"
            data-bs-target="#addLocationModal"
            type="button"
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
      <div className="location-page-card">
        <div className="location-page-head">
          <div className="location-page-title">Location</div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle location-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>S.no.</th>
                <th style={{ width: 160 }}>Role</th>
                <th>Location</th>
                <th style={{ width: 220 }}>Region</th>
                <th style={{ width: 200 }}>Popular</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.sno}</td>
                  <td>{r.role}</td>
                  <td>{r.location}</td>
                  <td>{r.region}</td>
                  <td>
                    <span
                      className={`pill-2 ${
                        r.popular === "Positive" ? "pill2-positive" : "pill2-negative"
                      }`}
                    >
                      {r.popular}{" "}
                      <span className="pill-arrow">{r.popular === "Positive" ? "↑" : "↓"}</span>
                    </span>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No locations found.
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
        id="addLocationModal"
        tabIndex="-1"
        aria-labelledby="addLocationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-pro">
            <div className="modal-header modal-pro-header">
              <h5 className="modal-title fw-bold" id="addLocationModalLabel">
                Add Location
              </h5>

              {/* ✅ ALSO cleanup when user closes by X */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={cleanupModalArtifacts}
              />
            </div>

            <form onSubmit={addItem} noValidate>
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
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    className="form-control"
                    name="location"
                    value={form.location}
                    onChange={onChange}
                    placeholder="e.g. London"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Region</label>
                  <input
                    className="form-control"
                    name="region"
                    value={form.region}
                    onChange={onChange}
                    placeholder="e.g. Europe"
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
                {/* ✅ cleanup when Cancel */}
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
