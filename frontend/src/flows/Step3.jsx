import "./styles/Step3.css";
import { SubmitSuccess } from "../assets/icons";
import { useState } from "react";

function Step3({ data, previous }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(data.submitResult?.token || data.token || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if (data.submitError) {
        return (
            <div className="step-container">
                <div className="error-text">Submission Failed: {data.submitError}</div>
                <button onClick={previous} className="previous-button">Back</button>
            </div>
        )
    }

    if (!data.submitResult) {
        return (
            <div className="step-container">
                <div className="submitting">Submitting...</div>
            </div>
        )
    } else {
        return (
            <div className="step-container">
                <SubmitSuccess alt="Success Icon" className="success-icon" />
                <div className="success-text">Your report has been submitted successfully!</div>
                <div className="step3-tracking">
                    <p>Your Tracking Token</p>
                    <div className="step3-token-row">
                        <div className="step3-token">{data.submitResult.token}</div>
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

    
}

export default Step3;