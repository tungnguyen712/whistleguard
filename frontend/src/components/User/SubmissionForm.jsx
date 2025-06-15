import Sidebar from "./Sidebar";
import "./styles/SubmissionForm.css";

const SubmissionForm = () => {
  return (
    <>
      <div className="submission-form-container">
        <Sidebar />
        <div className="submission-form-content"></div>
      </div>
      {/* <div>lorem dipsum</div> */}
    </>

  );
};

export default SubmissionForm;