import "./styles/Step3.css";
import { SubmitSuccess } from "../assets/icons";
import { useState } from "react";

function Step3() {
    const token = "ABC123DEF456";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="step-container">
            <SubmitSuccess alt="Success Icon" className="success-icon" />
            <div className="success-text">Your report has been submitted successfully!</div>
            <div className="step3-tracking">
                <p>Your Tracking Token</p>
                <div className="step3-token-row">
                    <div className="step3-token">{token}</div>
                    <button className="step3-copy-btn" onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            </div>
            <div>
                Please save this token to track the status of your report. You can enter this token anytime to check updates or make changes.
            </div>
        </div>
    )
}

export default Step3;