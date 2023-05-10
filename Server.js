const express = require("express");

const mysql = require("mysql");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "*",

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

    preflightContinue: false,

    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const db = mysql.createPool({
  host: "localhost",

  user: "root",

  password: "password",

  database: "student_info",
});

app.get("/api/users", (req, res) => {
  const sqlGet = "SELECT * FROM student";

  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const s_id = req.params.s_id;
  const { s_name, s_email } = req.body;

  const sqlInsert = "INSERT INTO student (s_name,s_email) VALUES (?, ?)";

  db.query(sqlInsert, [s_name, s_email], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Successfully inserted data into student table");
    }
  });
});

app.delete("/api/delete/:s_id", (req, res) => {
  const { s_id } = req.params;

  const sqlRemove = "DELETE FROM  student  WHERE  s_id=?";

  db.query(sqlRemove, s_id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Successfully deleted in student data");
    }
  });
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO student(s_id,s_name,s_email) VALUES (1,'pooji','pooji@gmail.com')";

  db.query(sqlInsert, (err, result) => {
    console.log("error", err);

    console.log("result", result);

    res.send(result);
  });
});

app.put("/api/update/:s_id", (req, res) => {
  const { s_id } = req.params;
  const { s_name, s_email } = req.body;

  const sqlUpdate = "UPDATE student SET s_name = ?, s_email = ? WHERE s_id = ?";

  db.query(sqlUpdate, [s_name, s_email, s_id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Successfully updated student data");
    }
  });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
