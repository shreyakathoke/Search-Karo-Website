import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const menu = [
    { icon: "bi-grid", label: "Dashboard", to: "/dashboard" },
    { icon: "bi-list-task", label: "Categories", to: "/categories" },
    { icon: "bi-file-earmark-text", label: "Reports", to: "/reports" },
    { icon: "bi-shield-check", label: "Legal Policy", to: "/legal-policy" },
    { icon: "bi-geo-alt", label: "Location", to: "/location" },
    { icon: "bi-star", label: "Rating", to: "/rating" },
  ];

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      
      <aside className="sidebar d-none d-md-flex flex-column">
        <div className="brand">
          <div className="brand-badge bg-primary">V</div>
          <div className="brand-name text-white">Searchkro</div>
        </div>

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

        
        <div className="mt-auto sidebar-footer">
          <button
            className="btn btn-outline-light w-100 logout-btn"
            type="button"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2" />
            Logout
          </button>
        </div>
      </aside>

      
      <div
        className="offcanvas offcanvas-start sidebar-offcanvas"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <div className="d-flex align-items-center gap-2">
            <div className="brand-badge">V</div>
            <div className="brand-name">Searchkro</div>
          </div>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
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
            <button
              className="btn btn-outline-light w-100 logout-btn"
              type="button"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
