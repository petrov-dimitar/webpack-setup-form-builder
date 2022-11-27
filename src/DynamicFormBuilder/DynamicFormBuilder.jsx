/** @format */
import { useEffect, useState } from "react";
import WizardForm from "./WizardForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Stepper from "./Stepper";
import { wizardJSON } from "./mockData/data";
import "../App.css";
import Alert from "react-bootstrap/Alert";

const DynamicFormBuilder = () => {
    const [currentStep, setCurrentStep] = useState({
        data: wizardJSON.pages[0],
        stepNumber: 0,
        isValid: false,
        validated: false,
    });
    const [triggerSubmit, setTriggerSubmit] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const isLastStep = currentStep.stepNumber + 1 > wizardJSON.pages.length - 1;

    const handleNextStepClick = () => {
        setTriggerSubmit((prev) => !prev);
    };

    useEffect(() => {
        if (wizardJSON.pages[currentStep.stepNumber + 1] && currentStep.isValid) {
            setCurrentStep({
                data: wizardJSON.pages[currentStep.stepNumber + 1],
                stepNumber: currentStep.stepNumber + 1,
                isValid: false,
                validated: false,
            });
            if (isLastStep) {
                setShowSuccessAlert(true);
            }
        }
    }, [currentStep.isValid]);

    const handlePrevStepClick = () => {
        if (wizardJSON.pages[currentStep.stepNumber - 1]) {
            setCurrentStep({
                data: wizardJSON.pages[currentStep.stepNumber - 1],
                stepNumber: currentStep.stepNumber - 1,
            });
        }
    };

    const handleFinishClick = () => {
        handleNextStepClick(true);
    };

    return (
        <>
            {showSuccessAlert && <Alert variant="success">Successful Form Submit</Alert>}

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
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    triggerSubmit={triggerSubmit}
                    onSubmit={(data) => {
                        console.log(data);
                    }}
                />
                <div>
                    {isLastStep ? (
                        <Button onClick={handleFinishClick}>Finish</Button>
                    ) : (
                        <Button onClick={handleNextStepClick}>Next Step</Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default DynamicFormBuilder;
