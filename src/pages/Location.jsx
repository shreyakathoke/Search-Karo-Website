import { useMemo, useState } from "react";
import "../styles/dashboard.css";

const initialRows = [
  { id: 1, sno: 1, role: "Buyer", location: "London", region: "Europe", popular: "Positive" },
  { id: 2, sno: 2, role: "Buyer", location: "Mumbai", region: "Asia", popular: "Negative" },
  { id: 3, sno: 3, role: "Seller", location: "Berlin", region: "Europe", popular: "Positive" },
  { id: 4, sno: 4, role: "Buyer", location: "Toronto", region: "North America", popular: "Positive" },
  { id: 5, sno: 5, role: "Buyer", location: "Paris", region: "Europe", popular: "Negative" },
  { id: 6, sno: 6, role: "Seller", location: "Berlin", region: "Europe", popular: "Positive" },
];

export default function Location() {
  const [rows, setRows] = useState(initialRows);

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

  const addItem = (e) => {
    e.preventDefault();
    if (!form.location.trim() || !form.region.trim()) return;

    const newRow = {
      id: Date.now(),
      sno: nextSno,
      role: form.role,
      location: form.location.trim(),
      region: form.region.trim(),
      popular: form.popular,
    };

    setRows((prev) => [...prev, newRow]);
    resetForm();

    // Close modal
    const modalEl = document.getElementById("addLocationModal");
    if (modalEl) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
    }
  };

  return (
    <div className="container-fluid px-4 py-3">
      {/* Header */}
      <div className="row align-items-center mb-3">
        <div className="col">
          
        </div>

        <div className="col-auto">
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
                      <span className="pill-arrow">
                        {r.popular === "Positive" ? "↑" : "↓"}
                      </span>
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

                {/* Location */}
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

                {/* Region */}
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
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">
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
