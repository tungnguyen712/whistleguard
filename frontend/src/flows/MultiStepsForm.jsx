import { useState, useEffect } from "react";
import { Button } from "../components/Shared/Button";
import { CancelIcon } from "../assets/icons";

function MultiStepsForm({ steps, onSubmit, initialData = {}, onStepChange, onClose }) {
    const [formData, setFormData] = useState(initialData);
    const [step, setStep] = useState(0);

    const next = (stepData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...stepData
        }));
        setStep(s => s + 1);
    }

    const previous = () => {
        setStep(s => s - 1);
    }

    const handleSubmit = (stepData) => {
        const finalData = {
            ...formData,
            ...stepData
        };
        onSubmit(finalData);
    }

    useEffect(() => {
        if (onStepChange) onStepChange(step);
    }, [step, onStepChange]);

    const StepComponent = steps[step];

    return (
        <div className="multi-steps-form" style={{ position: "relative"}}>
            {onClose && (
                <Button
                    content={<CancelIcon />}
                    handleEvent={onClose}
                    className="multistepform-close-button"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "none",
                        border: "none",
                        zIndex: 10,
                    }}
                />
            )

            }
            
            <StepComponent 
                data={formData}
                next={step === steps.length - 1 ? handleSubmit : next}
                previous={step > 0 ? previous : null}
            />
        </div>
    )
}

export default MultiStepsForm;
