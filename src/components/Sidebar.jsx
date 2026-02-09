import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { icon: "bi-grid", label: "Dashboard", to: "/dashboard" },
    { icon: "bi-list-task", label: "Categories", to: "/categories" },
    { icon: "bi-file-earmark-text", label: "Reports", to: "/reports" },
    { icon: "bi-shield-check", label: "Legal Policy", to: "/legal-policy" },
    { icon: "bi-geo-alt", label: "Location", to: "/location" },
    { icon: "bi-star", label: "Rating", to: "/rating" },
  ];

  return (
    <>
      {/* ================= Desktop Sidebar ================= */}
      <aside className="sidebar d-none d-md-flex flex-column">
        {/* Brand */}
        <div className="brand">
          <div className="brand-badge">V</div>
          <div className="brand-name text-white">Searchkro</div>
        </div>

        {/* Menu */}
        <nav className="nav flex-column mt-3">
          {menu.map((m) => (
            <NavLink
              key={m.label}
              to={m.to}
              className={({ isActive }) =>
                `side-link ${isActive ? "active" : ""}`
              }
              end={m.to === "/dashboard"}
            >
              <i className={`bi ${m.icon}`} />
              <span>{m.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto sidebar-footer">
          <button className="btn btn-outline-light w-100 logout-btn" type="button">
            <i className="bi bi-box-arrow-right me-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= Mobile Sidebar (Offcanvas) ================= */}
      <div
        className="offcanvas offcanvas-start sidebar-offcanvas"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <div className="d-flex align-items-center gap-2" id="mobileSidebarLabel">
            <div className="brand-badge">V</div>
            <div className="brand-name">Searchkro</div>
          </div>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body d-flex flex-column">
          <nav className="nav flex-column mt-2">
            {menu.map((m) => (
              <NavLink
                key={m.label}
                to={m.to}
                className={({ isActive }) =>
                  `side-link ${isActive ? "active" : ""}`
                }
                data-bs-dismiss="offcanvas"
                end={m.to === "/dashboard"}
              >
                <i className={`bi ${m.icon}`} />
                <span>{m.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-3">
            <button className="btn btn-outline-light w-100 logout-btn" type="button">
              <i className="bi bi-box-arrow-right me-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
