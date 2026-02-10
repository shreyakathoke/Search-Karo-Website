import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import resetImg from "../assets/reset.png";
import api from "../api/axios"; 

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const match = password && confirm && password === confirm;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!match) return;

    setLoading(true);

    try {
      
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create new password"
      subtitle="Choose a strong password and confirm it to secure your account."
      imageSrc={resetImg}
      imageAlt="Reset password illustration"
    >
      <form onSubmit={onSubmit} className="auth-form">
        <div className="mb-3">
          <label className="form-label">New password</label>
          <input
            className="form-control auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            minLength={6}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Confirm password</label>
          <input
            className={`form-control auth-input ${
              confirm ? (match ? "is-valid" : "is-invalid") : ""
            }`}
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            minLength={6}
            required
          />
          {confirm && !match && (
            <div className="invalid-feedback">Passwords do not match.</div>
          )}
        </div>

        {error && (
          <div className="alert alert-danger py-2 mt-3" role="alert">
            {error}
          </div>
        )}

        <button
          className="btn btn-primary auth-btn w-100 mt-3"
          disabled={loading || !match}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        <div className="mt-3">
          <Link className="auth-link" to="/login">
            <i className="bi bi-arrow-left me-1"></i> Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
