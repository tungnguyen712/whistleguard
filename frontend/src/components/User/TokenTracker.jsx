import { useState } from "react";
import Modal from "../Shared/Modal";
import Sidebar from "./Sidebar";
import { trackReport } from "../../api/report";
import "./styles/TokenTracker.css";

function TokenTracker() {
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    setError("");
    try {
      const data = await trackReport(token);
      setReport(data);
    } catch (err) {
      setError(err.message || "Failed to track report");
      console.error("Error tracking report:", err);
    }
    setSubmitting(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setReport(null);
    setToken("");
    setError("");
  }

  return (
    <div className="token-tracker-page">
      <Sidebar />
      <Modal
        isShow={showModal}
        onClose={handleClose}
        title={
          <div>
            <div className="token-tracker-title">
              Report Status Tracker
            </div>
            <div className="token-tracker-desc">
              Enter your token to check your report status
            </div>
          </div>
        }
        buttonRightContent={null}
      >

        {!report ? (
          <form className="token-tracker-modal-content" onSubmit={handleSubmit}>
            <div className="token-tracker-label">
              What is the Token of the Report that you want to track?
            </div>
            <input
              type="text"
              placeholder="Token"
              value={token}
              onChange={e => setToken(e.target.value)}
              className="token-tracker-input"
              disabled={submitting}
            />
            <div className="token-tracker-action-buttons">
              <button
                type="button"
                className="token-tracker-cancel-btn"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="token-tracker-submit-btn"
                disabled={submitting || !token}
              >
                {submitting ? "Submitting..." : "Submit Token"}
              </button>
            </div>
            {error && <div className="tracker-error">{error}</div>}
          </form>
        ) : (
          <div className="token-tracker-modal-content">
            <div className="token-tracker-label">Report Details</div>
            <div className="tracker-row"><span className="tracker-label">Title:</span> <span className="tracker-value">{report.title}</span></div>
            <div className="tracker-row"><span className="tracker-label">Description:</span> <span className="tracker-value">{report.description}</span></div>
            <div className="tracker-row"><span className="tracker-label">Category:</span> <span className="tracker-value">{report.category}</span></div>
            <div className="tracker-row"><span className="tracker-label">Status:</span> <span className="tracker-value">{report.status}</span></div>
            <div className="tracker-row">
              <span className="tracker-label">Submitted At:</span>{" "}
              <span className="tracker-value">
                {report.createdAt ? new Date(report.createdAt).toLocaleString() : "N/A"}
              </span>
            </div>
            <div className="token-tracker-action-buttons-2">
              <button
                type="button"
                className="token-tracker-cancel-btn"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TokenTracker;