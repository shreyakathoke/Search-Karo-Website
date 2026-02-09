export default function Topbar() {
  return (
    <div className="topbar px-3 px-md-4">
      <div className="d-flex align-items-center gap-2">
        {/* Mobile menu button */}
        <button
          className="btn btn-light d-md-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          <i className="bi bi-list" />
          
        </button>
      </div>

      <div className="ms-auto d-flex align-items-center gap-3">
        <button className="icon-btn" aria-label="notifications">
          <i className="bi bi-bell" />
        </button>

        <div className="dropdown">
          <button
            className="profile-btn dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <img
              className="avatar"
              alt="profile"
              src="https://i.pravatar.cc/100?img=47"
            />
          </button>

          <div className="dropdown-menu dropdown-menu-end profile-menu p-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                className="avatar-lg"
                alt="profile"
                src="https://i.pravatar.cc/100?img=47"
              />
              <div>
                <div className="fw-semibold">John Doe</div>
                <div className="text-muted small">Admin</div>
              </div>
              <button className="ms-auto btn btn-sm btn-light">
                <i className="bi bi-pencil" />
              </button>
            </div>

            <hr className="my-2" />

            <button className="dropdown-item d-flex align-items-center gap-2">
              <i className="bi bi-box-arrow-right" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
