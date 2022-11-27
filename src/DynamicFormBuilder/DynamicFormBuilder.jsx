/** @format */
import { useState } from "react";
import WizardForm from "./WizardForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Stepper from "./Stepper";
import { wizardJSON } from "./mockData/data";
import "../App.css";

const DynamicFormBuilder = () => {
    const [currentStep, setCurrentStep] = useState({ data: wizardJSON.pages[0], stepNumber: 0 });

    const handleNextStepClick = () => {
        if (wizardJSON.pages[currentStep.stepNumber + 1]) {
            setCurrentStep({
                data: wizardJSON.pages[currentStep.stepNumber + 1],
                stepNumber: currentStep.stepNumber + 1,
            });
        }
    };

    const handlePrevStepClick = () => {
        if (wizardJSON.pages[currentStep.stepNumber - 1]) {
            setCurrentStep({
                data: wizardJSON.pages[currentStep.stepNumber - 1],
                stepNumber: currentStep.stepNumber - 1,
            });
        }
    };

    return (
        <>
            <div
                style={{
                    marginBottom: "40px",
                }}
            >
                <Stepper currentIndex={currentStep.stepNumber} items={wizardJSON.pages}></Stepper>
            </div>
            <h2 style={{ textAlign: "center" }}>{currentStep && currentStep.data.title}</h2>

            <div
                className="container"
                style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <Button onClick={handlePrevStepClick}>Previous Step</Button>
                </div>

                <WizardForm
                    formJSON={currentStep.data}
                    onSubmit={(data) => {
                        console.log(data);
                    }}
                />
                <div>
                    <Button onClick={handleNextStepClick}>Next Step</Button>
                </div>
            </div>
        </>
    );
};

export default DynamicFormBuilder;
