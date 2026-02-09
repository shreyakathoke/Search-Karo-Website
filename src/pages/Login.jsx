import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

import loginImg from "../assets/login.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // TODO: call your backend API
    // await fetch("/api/auth/login", ...)

    setTimeout(() => {
      setLoading(false);
      alert("Login UI done ✅ (connect API next)");
    }, 600);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue to your dashboard"
      imageSrc={loginImg}
      imageAlt="Login illustration"
    >
      <form onSubmit={onSubmit} className="auth-form">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control auth-input"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Password</label>
          <input
            className="form-control auth-input"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="d-flex justify-content-end mb-3">
          <Link className="auth-link" to="/forgot-password">
            Forgot password?
          </Link>
        </div>

        <button className="btn btn-primary auth-btn w-100" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <div className="auth-divider my-4">
          <span>or</span>
        </div>

        <button type="button" className="btn btn-outline-dark w-100 auth-btn-outline">
          <i className="bi bi-google me-2"></i>
          Log in with Google
        </button>

        <p className="mt-3 mb-0 text-center auth-hint">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
