import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

import resetImg from "../assets/reset.png";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const match = password && confirm && password === confirm;

  async function onSubmit(e) {
    e.preventDefault();
    if (!match) return;

    setLoading(true);

    // TODO: call backend to set new password
    // await fetch("/api/auth/reset-password", ...)

    setTimeout(() => {
      setLoading(false);
      alert("Password reset UI done ✅ (connect API next)");
    }, 700);
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
            className={`form-control auth-input ${confirm ? (match ? "is-valid" : "is-invalid") : ""}`}
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

        <button className="btn btn-primary auth-btn w-100 mt-3" disabled={loading || !match}>
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
