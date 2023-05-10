import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentTableRow = (props) => {
  const { s_id, s_name, s_email } = props.obj;

  const deleteStudent = () => {
    axios
      .delete(`http://localhost:5000/api/delete/${s_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{s_name}</td>
      <td>{s_email}</td>

      <td>
        <Link className="edit-link" to={"/edit-student/" + s_id}>
          Edit
        </Link>
        <Button onClick={deleteStudent} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default StudentTableRow;
