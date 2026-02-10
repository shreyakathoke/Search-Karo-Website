import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import LogoutModal from "../components/LogoutModal";




function RatingDonut({ positive = 50 }) {
  const p = Math.max(0, Math.min(100, positive));
  const deg = (p / 100) * 360;

  return (
    <div
      className="donut"
      style={{
        background: `conic-gradient(#22c55e 0deg ${deg}deg, #ef4444 ${deg}deg 360deg)`,
      }}
    >
      <div className="donut-hole" />
    </div>
  );
}

function CardHeader({ title, onView }) {
  return (
    <div className="card-header soft-card-header">
      <div className="d-flex align-items-center justify-content-between w-100">
        <span className="card-title-text">{title}</span>

        <button type="button" className="btn btn-dark btn-sm view-btn" onClick={onView}>
          View
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const categoriesData = [
    { sno: 1, role: "Buyer", category: "Clothes", product: "Jeans" },
    { sno: 2, role: "Buyer", category: "Mobile", product: "iPhone" },
    { sno: 3, role: "Seller", category: "Laptop", product: "Dell" },
  ];

  const locationData = [
    { sno: 1, role: "Buyer", city: "London", region: "Europe" },
    { sno: 2, role: "Buyer", city: "Mumbai", region: "Asia" },
    { sno: 3, role: "Seller", city: "Berlin", region: "Europe" },
  ];

  function handleLogout() {
    // clear token
    localStorage.removeItem("token");

    // close modal
    setShowLogout(false);

    // go login
    navigate("/login", { replace: true });
  }

  return (
    <div className="container-fluid px-4 py-3">
      {/* Page Title */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="m-0 fw-bold">Dashboard</h4>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => setShowLogout(true)}
        >
          Logout
        </button>
      </div>

      {/* Top Row */}
      <div className="row g-3">
        {/* Categories */}
        <div className="col-12 col-lg-6">
          <div className="card soft-card h-100">
            <CardHeader title="Categories" onView={() => navigate("/categories")} />

            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>S.no.</th>
                      <th style={{ width: 140 }}>Role</th>
                      <th>Categories</th>
                      <th style={{ width: 180 }}>Product</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categoriesData.map((row) => (
                      <tr key={row.sno}>
                        <td>{row.sno}</td>
                        <td>{row.role}</td>
                        <td>{row.category}</td>
                        <td>{row.product}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="col-12 col-lg-6">
          <div className="card soft-card h-100">
            <CardHeader title="Location" onView={() => navigate("/location")} />

            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>S.no.</th>
                      <th style={{ width: 140 }}>Role</th>
                      <th>City</th>
                      <th style={{ width: 180 }}>Region</th>
                    </tr>
                  </thead>

                  <tbody>
                    {locationData.map((row) => (
                      <tr key={row.sno}>
                        <td>{row.sno}</td>
                        <td>{row.role}</td>
                        <td>{row.city}</td>
                        <td>{row.region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        {/* Legal Policy */}
        <div className="col-12 col-xl-5">
          <div className="card soft-card h-100">
            <CardHeader title="Legal policy" onView={() => navigate("/legal-policy")} />

            <div className="card-body">
              <div className="faq-highlight">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <div className="faq-title">How do I book a service?</div>
                    <p className="faq-desc">
                      You can book a service by selecting your preferred category,
                      choosing a time slot, and confirming the booking via the app.
                    </p>
                  </div>

                  <button type="button" className="btn-close-white" aria-label="Close">
                    ✕
                  </button>
                </div>
              </div>

              <button type="button" className="faq-item mt-3">
                <span>How do I track my service provider?</span>
                <span className="arrow">›</span>
              </button>

              <button type="button" className="faq-item mt-2">
                <span>How do I rate and review a service?</span>
                <span className="arrow">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report */}
        <div className="col-12 col-xl-4">
          <div className="card soft-card h-100">
            <CardHeader title="Report" onView={() => navigate("/reports")} />

            <div className="card-body">
              <div className="report-title">Company Overview</div>

              <p className="report-text mb-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>

              <p className="report-text mb-0">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="col-12 col-xl-3">
          <div className="card soft-card h-100">
            <CardHeader title="Rating" onView={() => navigate("/rating")} />

            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <RatingDonut positive={50} />
              </div>

              <div>
                <div className="legend-row">
                  <span className="dot dot-green" />
                  <span className="text-muted">Positive</span>
                  <span className="ms-auto fw-semibold">50%</span>
                  <span className="ms-2 text-success small">↑</span>
                </div>

                <div className="legend-row mt-2">
                  <span className="dot dot-red" />
                  <span className="text-muted">Negative</span>
                  <span className="ms-auto fw-semibold">50%</span>
                  <span className="ms-2 text-danger small">↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-accent mt-4" />

      {/* ✅ Logout modal here */}
      <LogoutModal
        open={showLogout}
        seconds={3}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
