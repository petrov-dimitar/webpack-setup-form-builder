/** @format */

import logo from "./logo.svg";
import "./App.css";
import DynamicFormBulder from "./DynamicFormBuilder/DynamicFormBuilder";
import "bootstrap/dist/css/bootstrap.min.css";

const formJSON = [
  {
    fields: [
      {
        id: "firstname",
        label: "First Name",
        required: true,
        placeholder: "Enter your first name ...",
        type: "text",
        value: "",
      },
      {
        id: "lastname",
        label: "Last Name",
        required: true,
        placeholder: "Enter your last name ...",
        type: "text",
        value: "",
      },
      {
        id: "country",
        label: "County",
        required: true,
        type: "select",
        options: [
          { label: "Bulgaria" },
          { label: "Greece" },
          { label: "Romania" },
          { label: "Serbia" },
        ],
        value: "",
      },
      {
        id: "subscribe",
        label: "Subscribe to newsletter",
        type: "checkbox",
        value: "",
      },
    ],
  },
];

function App() {
  return (
    <div className="container">
      <DynamicFormBulder
        formJSON={formJSON}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
}

export default App;
