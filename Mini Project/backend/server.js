const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: String, required: true }
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

// Check that the API is running
app.get("/", (req, res) => {
  res.send("Personal Expense Tracker API is running.");
});

// READ: get all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch expenses." });
  }
});

// CREATE: add an expense
app.post("/api/expenses", async (req, res) => {
  try {
    const { name, category, amount, date } = req.body;
    if (!name || !category || amount === "" || amount === undefined || !date) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const expense = await Expense.create({
      name,
      category,
      amount: Number(amount),
      date
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Could not add expense. Check the entered values." });
  }
});

// UPDATE: edit an expense
app.put("/api/expenses/:id", async (req, res) => {
  try {
    const { name, category, amount, date } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { name, category, amount: Number(amount), date },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: "Could not update expense." });
  }
});

// DELETE: remove an expense
app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }
    res.json({ message: "Expense deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Could not delete expense." });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    console.error("Check that MongoDB is running and MONGO_URI in backend/.env is correct.");
    process.exit(1);
  });
