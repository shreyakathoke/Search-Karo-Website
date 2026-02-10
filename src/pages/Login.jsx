import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import loginImg from "../assets/login.png";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      // ✅ FIXED: backend returns "token"
      const token = res.data?.token;

      if (!token) {
        throw new Error("No token returned from backend");
      }

      // Save JWT
      localStorage.setItem("token", token);

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue to your dashboard"
      imageSrc={loginImg}
      imageAlt="Login illustration"
    >
      <form onSubmit={onSubmit} className="auth-form">

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

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
          <Link className="auth-link" to="/forgot">
            Forgot password?
          </Link>
        </div>

        <button className="btn btn-primary auth-btn w-100" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <div className="auth-divider my-4">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn btn-outline-dark w-100 auth-btn-outline"
        >
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
