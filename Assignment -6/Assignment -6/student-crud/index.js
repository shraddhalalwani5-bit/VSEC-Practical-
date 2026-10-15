const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let students;

// Home page
app.get("/", (req, res) => {
  res.send("Student CRUD API is running!");
});

// GET: Display all students
app.get("/students", async (req, res) => {
  try {
    const data = await students.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Add a student
app.post("/students", async (req, res) => {
  try {
    if (!req.body.name || req.body.marks === undefined) {
      return res.status(400).json({
        message: "Please provide name and marks"
      });
    }

    const result = await students.insertOne({
      name: req.body.name,
      marks: Number(req.body.marks)
    });

    res.status(201).json({
      message: "Student added successfully",
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update a student
app.put("/students/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const result = await students.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          marks: Number(req.body.marks)
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const result = await students.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await client.connect();
    const db = client.db("college");
    students = db.collection("students");

    console.log("MongoDB connected successfully");

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (error) {
    console.error("Connection error:", error.message);
  }
}

startServer();