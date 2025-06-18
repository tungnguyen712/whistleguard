import Sidebar from "./Sidebar";
import "./styles/SubmissionForm.css";

const SubmissionForm = () => {
  return (
    <div className="submission-form-container">
      <Sidebar />
      <div className="submission-form-content">
        <h1>Submit a Report</h1>
        <p>This is the main content area where you can add your form or any other content.</p>
        <div>Test content - this should appear in the main area</div>
        <div>Truc</div>
      </div>
    </div>
  );
};

export default SubmissionForm;