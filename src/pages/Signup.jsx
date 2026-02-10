import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import signupImg from "../assets/signup.png";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      
      const res = await api.post("/auth/signup", form);
      const data = res.data;

      
      if (data?.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard", { replace: true });
        return;
      }

     
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          err?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Let’s get started with your 30 days trial"
      imageSrc={signupImg}
      imageAlt="Signup illustration"
    >
      <form onSubmit={onSubmit} className="auth-form">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control auth-input"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
        </div>

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
          <div className="input-group">
            <span className="input-group-text auth-addon">
              <i className="bi bi-key"></i>
            </span>
            <input
              className="form-control auth-input"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Create a strong password"
              minLength={6}
              required
            />
          </div>
          <div className="form-text">Minimum 6 characters.</div>
        </div>

        {error && (
          <div className="alert alert-danger py-2 mt-3" role="alert">
            {error}
          </div>
        )}

        <button className="btn btn-primary auth-btn w-100 mt-3" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>

        <div className="auth-divider my-4">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn btn-outline-dark w-100 auth-btn-outline"
        >
          <i className="bi bi-google me-2"></i>
          Sign up with Google
        </button>

        <p className="mt-3 mb-0 text-center auth-hint">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
