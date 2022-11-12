/** @format */

import react, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

class DynamicFormBulder extends Component {
  constructor(props) {
    super(props);
    this.state = { validated: false, isValid: false };
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Make state to valid to show success and reset form.
      this.setState({ isValid: true, validated: false });
      event.preventDefault();

      //   Apply custom onSubmit from props
      if (this.props.onSubmit) {
        // Transform data parameter to desired structure.
        const data = [...this.props.formJSON[0].fields].map((field) => {
          const element = document.getElementById(field.id);
          if (element) {
            return { [element.id]: element.value };
          }
          return undefined;
        });

        this.props.onSubmit(data);
      }
      return;
    }
    this.setState({ validated: true });
  };
  render() {
    return (
      <>
        <h3> Dynamic Form Builder With Class Components</h3>

        {this.state.isValid && (
          <Alert variant="success">Successful Form Submit</Alert>
        )}

        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group as={Col} md="4">
            {this.props.formJSON[0].fields.map((field) => {
              if (field.type === "select") {
                return (
                  <div key={field.id}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      id={field.id}
                    >
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
                      feedback={
                        field.required
                          ? "Please check that box before submit"
                          : undefined
                      }
                      feedbackType="invalid"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={field.id}>
                    <Form.Label>{field.label}</Form.Label>
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
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      </>
    );
  }
}

export default DynamicFormBulder;
