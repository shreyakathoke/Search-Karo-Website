// components/AuthLayout.jsx
import React from "react";
import "../styles/auth.css";

export default function AuthLayout({ title, subtitle, imageSrc, imageAlt, children }) {
  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-left">
          <img className="auth-illustration" src={imageSrc} alt={imageAlt || "Auth"} />
        </div>

        <div className="auth-right">
          <h1 className="auth-title">{title}</h1>

          {/* keep subtitle support if you need it later; it’s hidden by CSS to match screenshot */}
          {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}

          {children}
        </div>
      </div>
    </div>
  );
}
