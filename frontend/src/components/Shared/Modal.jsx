import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Button } from "./Button";
// import { CancelIcon } from "../../assets/icons";
import { useEffect, useState } from "react";
import "./styles/Modal.css";

function Modal({
  isShow = false,
  submitting = false,
  title,
  children,
  onClose,
  handleEvent,
  buttonRightContent = "",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isShow) return null;

  return createPortal(
    <div tabIndex="-1" className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            {/* <Button content={<CancelIcon />} handleEvent={onClose} className="modal-close-button" /> */}
          </div>

          <div className="modal-body">{children}</div>

          {handleEvent && (
            <div className="modal-footer">
              <Button
                content="Cancel"
                handleEvent={onClose}
                className="modal-cancel-button"
              />
              <Button
                content={buttonRightContent}
                isSubmitting={submitting}
                disabled={submitting}
                className="modal-confirm-button"
                handleEvent={handleEvent}
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  handleEvent: PropTypes.func,
  buttonRightContent: PropTypes.string,
};

export default Modal;