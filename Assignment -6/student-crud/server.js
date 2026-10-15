
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let students;

async function startServer() {
    try {
        await client.connect();

        const db = client.db("student_practical");
        students = db.collection("students");

        console.log("MongoDB Connected Successfully");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    } catch (error) {
        console.log(error);
    }
}

// Display all students
app.get("/students", async (req, res) => {
    const data = await students.find().toArray();
    res.json(data);
});

// Add a student
app.post("/students", async (req, res) => {
    const result = await students.insertOne(req.body);
    res.json({
        message: "Student added successfully",
        id: result.insertedId
    });
});

// Display one student
app.get("/students/:id", async (req, res) => {
    try {
        const student = await students.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: "Invalid student ID" });
    }
});

// Update a student
app.put("/students/:id", async (req, res) => {
    try {
        const result = await students.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid student ID" });
    }
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
    try {
        const result = await students.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid student ID" });
    }
});

startServer();
