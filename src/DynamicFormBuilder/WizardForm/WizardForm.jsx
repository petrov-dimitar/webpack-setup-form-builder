/** @format */

import react, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const WizardForm = (props) => {
    const [validated, setValidated] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [showEmailField, setShowEmailField] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // Make state to valid to show success and reset form.
            setIsValid(true);
            setValidated(false);
            event.preventDefault();

            //   Apply custom onSubmit from props
            if (props.onSubmit) {
                // Transform data parameter to desired ructure.
                const data = [...props.formJSON.fields].map((field) => {
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

                props.onSubmit(data);
            }
            return;
        }
        setValidated(true);
    };

    return (
        <div>
            {isValid && <Alert variant="success">Successful Form Submit</Alert>}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Col}>
                    {props.formJSON.fields.map((field) => {
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

                <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <Button type="submit">Submit form</Button>
                </div>
            </Form>
        </div>
    );
};

export default WizardForm;
