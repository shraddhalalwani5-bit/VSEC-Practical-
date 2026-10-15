
const express = require("express");

const app = express();
app.use(express.json());

let students = [];
let nextId = 1;

// Home route
app.get("/", (req, res) => {
  res.send("API CRUD Project is running!");
});

// GET: Display all students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST: Add a student
app.post("/students", (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks === undefined || !Number.isFinite(Number(marks))) {
    return res.status(400).json({
      message: "Please provide a name and valid marks"
    });
  }

  const student = {
    id: nextId++,
    name: name,
    marks: Number(marks)
  };

  students.push(student);

  res.status(201).json({
    message: "Student added successfully",
    student: student
  });
});

// PUT: Update a student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  if (req.body.name !== undefined) {
    student.name = req.body.name;
  }

  if (req.body.marks !== undefined) {
    if (!Number.isFinite(Number(req.body.marks))) {
      return res.status(400).json({
        message: "Marks must be a number"
      });
    }

    student.marks = Number(req.body.marks);
  }

  res.json({
    message: "Student updated successfully",
    student: student
  });
});

// DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students.splice(index, 1);

  res.json({
    message: "Student deleted successfully"
  });
});

// Start the server
app.listen(3001, () => {
  console.log("API CRUD server running at http://localhost:3001");
});
