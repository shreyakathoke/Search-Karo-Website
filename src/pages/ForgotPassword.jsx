import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import forgotImg from "../assets/forgot.png";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      

      
      navigate("/reset", { replace: true });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter the email you used when you joined and we’ll send you a code to reset your password."
      imageSrc={forgotImg}
      imageAlt="Forgot password illustration"
    >
      <form onSubmit={onSubmit} className="auth-form">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <button className="btn btn-primary auth-btn w-100" disabled={loading}>
          {loading ? "Sending..." : "Continue"}
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
