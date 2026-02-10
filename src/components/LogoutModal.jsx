import React, { useEffect } from "react";
import "../styles/logout-modal.css";

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
}) {
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
    <div className="lm-backdrop" onClick={onClose}>
      <div
        className="lm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lm-close" onClick={onClose}>
          ×
        </button>

        <div className="lm-icon">
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

        <h2 className="lm-title">Confirm Logout</h2>

        <p className="lm-text">
          Are you sure you want to logout from your account?
        </p>

        <div className="lm-actions">
          

          <button className="lm-btn" onClick={onConfirm}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
