import "../styles/dashboard.css";

export default function LegalPolicy() {
  const faq = [
    "How do I track my service provider?",
    "What if I face an issue with the service?",
    "How do I rate and review a service?",
    "What services does this app provide?",
    "Is registration required to use the app?",
    "How can I cancel or reschedule a service?",
    "What payment methods are accepted?",
  ];

  return (
    <div className="container-fluid px-4 py-3">
      

      <div className="legal-wrap">
        <h1 className="page-title mb-3">Legal Policy</h1>
        {/* Highlight card */}
        <div className="legal-highlight">
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <div className="legal-h-title">How do I book a service?</div>
              <p className="legal-h-desc">
                You can book a service by selecting your preferred category, choosing a time slot, and confirming
                the booking via the app.
              </p>
            </div>

            <button className="legal-close" type="button" aria-label="close">
              ×
            </button>
          </div>
        </div>

        {/* FAQ list */}
        <div className="mt-3 d-flex flex-column gap-3">
          {faq.map((q, idx) => (
            <button key={idx} className="legal-faq" type="button">
              <span className="legal-faq-text">{q}</span>

              {/* last 2 show + like screenshot */}
              <span className="legal-icon">{idx >= 5 ? "+" : "›"}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
