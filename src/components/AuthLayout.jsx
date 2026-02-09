import React from "react";

export default function AuthLayout({
  title,
  subtitle,
  children,
  imageSrc,
  imageAlt = "Illustration",
}) {
  return (
    <div className="auth-page">
      <div className="container py-4 py-md-5">
        <div className="row g-4 align-items-stretch auth-card">
          {/* LEFT: Form */}
          <div className="col-12 col-lg-6">
            <div className="auth-panel h-100">
              <div className="mb-3">
                <div className="brand">
                  <div className="brand-badge">
                    <i className="bi bi-shield-lock"></i>
                  </div>
                  <span className="brand-name">SecureAuth</span>
                </div>
              </div>

              <h1 className="auth-title">{title}</h1>
              {subtitle && <p className="auth-subtitle">{subtitle}</p>}

              <div className="mt-4">{children}</div>
            </div>
          </div>

          {/* RIGHT: Illustration */}
          <div className="col-12 col-lg-6">
            <div className="auth-illustration h-100">
              <img src={imageSrc} alt={imageAlt} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
