// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import { useParams } from "react-router-dom";

// EditStudent Component
const EditStudent = (props) => {
  const { s_id } = useParams();
  const [formValues, setFormValues] = useState({
    s_name: "",
    s_email: "",
  });

  //onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put(
        `http://localhost:5000/api/update/${s_id}` + props.match.params.s_id,
        studentObject
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          props.history.push("/student-list");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users" + props.match.params.id)
      .then((res) => {
        const { s_name, s_email } = res.data;
        setFormValues({ s_name, s_email });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return student form
  return (
    <StudentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Student
    </StudentForm>
  );
};

// Export EditStudent Component
export default EditStudent;
