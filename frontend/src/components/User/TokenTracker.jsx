import { useState } from "react";
import Modal from "../Shared/Modal";
import Sidebar from "./Sidebar";
import "./styles/TokenTracker.css";

function TokenTracker() {
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // handle token submit logic here
    setSubmitting(false);
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

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
              Enter your token that we give you last time to check your report status
            </div>
          </div>
        }
        buttonRightContent={null} // Remove default modal button
      >
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
        </form>
      </Modal>
    </div>
  );
}

export default TokenTracker;