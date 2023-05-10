import React, { useState } from "react";
import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { FormGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

const StudentForm = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string()
      .email("You have enter an invalid email address")
      .required("Required"),
  });
  const [formValues, setFormValues] = useState({
    s_name: "",
    s_email: "",
  });
  const handleFormChange = (values, identifier) => {
    if (identifier === "name") {
      setFormValues({ ...formValues, s_name: values });
    }
    if (identifier === "email") {
      setFormValues({ ...formValues, s_email: values });
    }
    console.log(values);
  };
  console.log(formValues);
  const onSubmit = () => {
    axios
      .post("http://localhost:5000/api/post", formValues)
      .then((res) => {
        if (res.status === 200) alert("Student successfully created");
        // else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };
  console.log(props);
  return (
    // <>
    //   <label>Name</label>
    //   <input
    //     type="text"

    //     onChange={(e) => handleFormChange(e.target.value, "name")}
    //   />
    //   <br />
    //   <label>Email</label>
    //   <input
    //     type="email"

    //     onChange={(e) => handleFormChange(e.target.value, "email")}
    //   />
    //   <button onClick={onSubmit}>submit</button>
    // </>
    <>
      <form
        style={{
          background: "pink",
          width: "600px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <label style={{ marginBottom: "10px" }}>Name</label>
        <input
          type="text"
          value={formValues.name}
          onChange={(e) => handleFormChange(e.target.value, "name")}
          style={{
            padding: "20px",
            marginBottom: "7px",
          }}
        />
        <label style={{ color: "black", marginBottom: "px" }}>Email</label>
        <input
          type="email"
          value={formValues.email}
          onChange={(e) => handleFormChange(e.target.value, "email")}
          style={{
            padding: "20px",
            marginBottom: "40px",
          }}
        />
        <button
          onClick={onSubmit}
          style={{
            backgroundColor: "lightgreen",
            padding: "20px",
            color: "black",
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default StudentForm;
