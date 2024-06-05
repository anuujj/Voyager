import { useState } from "react";
import "../styles/stepper.css";

interface Step {
  label: string;
  status: "completed" | "active" | "inactive";
}

interface StepperProps {
  steps: Step[];
}

const Stepper = ({ steps }: StepperProps) => {
  const [activeStep, setActiveStep] = useState(false);
  const handleMouseEnter = () => {
    setActiveStep(true);
  };
  const handleMouseLeave = () => {
    setActiveStep(false);
  };
  return (
    <div className="stepper-wrapper">
      {steps.map((step, index) => (
        <div key={index} className={`step-container ${step.status}`}>
          <div
            className={`step-circle ${step.status}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {step.status === "completed" ? '✔️' : "!"}
          </div>
          {(step.status !== "active" || activeStep) && (
            <span className="step-label">{step.label}</span>
          )}
          {index < steps.length - 1 && (
            <div className={`step-line ${step.status}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
