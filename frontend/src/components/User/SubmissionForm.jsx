import Sidebar from "./Sidebar";
import "./styles/SubmissionForm.css";
import MultiStepsForm from "../../flows/MultiStepsForm";
import Step1 from "../../flows/Step1";
import Step2 from "../../flows/Step2";
import Step3 from "../../flows/Step3";
import Modal from "../Shared/Modal";
import StepProgressBar from "../../flows/StepProgressBar";
import { useState } from "react";

const SubmissionForm = () => {
  const steps = [Step1, Step2, Step3];
  const [showModal, setShowModal] = useState(true); 
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  }

  const handleSubmit = (data) => {
    console.log("Form submitted with data:", data);
    setFormData(data);
    setShowModal(false);
    // Add logic to send formData to the server
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="submission-form-container">
      <Sidebar />
      <Modal
        isShow={showModal}
        title={<StepProgressBar step={currentStep} />}
        onClose={handleCloseModal}
        buttonRightContent=""
      >
        <MultiStepsForm 
          steps={steps} 
          onSubmit={handleSubmit} 
          onStepChange={handleStepChange} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default SubmissionForm;