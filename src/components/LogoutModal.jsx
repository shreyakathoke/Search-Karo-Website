import React, { useEffect, useState } from "react";
import "../styles/logout-modal.css";

export default function LogoutModal({
  open,
  seconds = 3,
  onClose,
  onConfirm,
}) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (!open) return;

    setLeft(seconds);
    const id = setInterval(() => {
      setLeft((p) => p - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [open, seconds]);

  useEffect(() => {
    if (!open) return;
    if (left <= 0) onConfirm?.(); // auto logout when timer ends
  }, [left, open, onConfirm]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lm-backdrop" role="presentation" onClick={onClose}>
      <div
        className="lm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lm-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="lm-icon" aria-hidden="true">
          {/* simple "logout door" icon */}
          <svg width="72" height="72" viewBox="0 0 64 64">
            <path
              d="M10 8h22a4 4 0 0 1 4 4v8h-6v-6H16v36h14v-6h6v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M36 32h14l-5-5 4-4 12 12-12 12-4-4 5-5H36v-6z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 id="logout-title" className="lm-title">
          You are Logged Out?
        </h2>

        <p className="lm-text">
          You are about to logout in{" "}
          <span className="lm-count">{Math.max(left, 0)}</span> secs, Do you want
          to continue?
        </p>

        <button className="lm-btn" onClick={onConfirm}>
          Log Out
        </button>
      </div>
    </div>
  );
}
