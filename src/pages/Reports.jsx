import "../styles/dashboard.css";

export default function Reports() {
  return (
    <div className="container-fluid px-4 py-3">
      

      <div className="report-page-card">
        <h1 className="page-title mb-3">Reports</h1>
        <div className="report-section">
          <h3 className="report-h3">Company Overview</h3>
          <hr className="report-divider" />
          <p className="report-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
            in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="report-section mt-4">
          <h3 className="report-h3">Market Position and Competitors</h3>
          <hr className="report-divider" />
          <p className="report-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
            in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="report-section mt-4">
          <h3 className="report-h3">Challenges and Risks</h3>
          <hr className="report-divider" />
          <p className="report-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book. It has survived not only five centuries.
          </p>
        </div>
      </div>
    </div>
  );
}
