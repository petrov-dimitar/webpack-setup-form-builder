/** @format */

import react, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const WizardForm = ({ onSubmit, formJSON, setCurrentStep, triggerSubmit, currentStep }) => {
    const [showEmailField, setShowEmailField] = useState(false);
    const [formRef, setFormRef] = useState(null);

    useEffect(() => {
        if (formRef) {
            formRef.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
    }, [triggerSubmit]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setCurrentStep((prev) => ({ ...prev, isValid: false, validated: true }));
        } else {
            // Make state to valid to show success and reset form.
            event.preventDefault();

            setCurrentStep((prev) => ({ ...prev, isValid: true, validated: true }));

            //   Apply custom onSubmit from props
            if (onSubmit) {
                // Transform data parameter to desired ructure.
                const data = formJSON.fields.map((field) => {
                    const element = document.getElementById(field.id);
                    if (element) {
                        return { [element.id]: element.value };
                    }
                    return undefined;
                });

                if (showEmailField) {
                    const element = document.getElementById("email");
                    data.push({
                        email: element.value,
                    });
                }

                onSubmit(data);
            }
            return;
        }
    };

    return (
        <div>
            <Form
                noValidate
                validated={currentStep.validated}
                onSubmit={handleSubmit}
                ref={(newRef) => setFormRef(newRef)}
            >
                <Form.Group as={Col}>
                    {formJSON.fields.map((field) => {
                        if (field.type === "select") {
                            return (
                                <div key={field.id}>
                                    <Form.Label className={field.required && "required-field"}>
                                        {field.label}
                                    </Form.Label>
                                    <Form.Select aria-label="Default select example" id={field.id}>
                                        {field.options.map((option) => (
                                            <option key={option.label} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            );
                        } else if (field.type === "checkbox") {
                            return (
                                <div key={field.id}>
                                    <Form.Check
                                        required={field.required}
                                        id={field.id}
                                        label={field.label}
                                        feedback={field.required ? "Please check that box before submit" : undefined}
                                        feedbackType="invalid"
                                        onChange={(e) => {
                                            setShowEmailField(e.target.checked);
                                        }}
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <div key={field.id}>
                                    <Form.Label className={field.required && "required-field"}>
                                        {field.label}
                                    </Form.Label>
                                    <Form.Control
                                        required={field.required}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        id={field.id}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid {field.label}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </div>
                            );
                        }
                    })}

                    {showEmailField && (
                        <div>
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" placeholder="email" id="email" />
                            <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </div>
                    )}
                </Form.Group>
            </Form>
        </div>
    );
};

export default WizardForm;
