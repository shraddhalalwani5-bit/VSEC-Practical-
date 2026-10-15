import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api/expenses";
const emptyForm = { name: "", category: "Food", amount: "", date: new Date().toISOString().slice(0, 10) };

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadExpenses() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Unable to load expenses.");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      setMessage("Cannot connect to the backend. Make sure the backend terminal is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  );

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Something went wrong.");

      setForm(emptyForm);
      setEditingId(null);
      setMessage(editingId ? "Expense updated successfully." : "Expense added successfully.");
      await loadExpenses();
    } catch (error) {
      setMessage(error.message || "Could not save expense.");
    }
  }

  function startEdit(expense) {
    setForm({
      name: expense.name,
      category: expense.category,
      amount: String(expense.amount),
      date: expense.date
    });
    setEditingId(expense._id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  }

  async function deleteExpense(id) {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not delete expense.");
      setMessage("Expense deleted successfully.");
      if (editingId === id) cancelEdit();
      await loadExpenses();
    } catch (error) {
      setMessage(error.message || "Could not delete expense.");
    }
  }

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand-mark">₹</div>
        <div>
          <p className="eyebrow">YOUR MONEY, CLEARER</p>
          <h1>Personal Expense Tracker</h1>
        </div>
      </header>

      <section className="summary">
        <div>
          <p className="summary-label">Total recorded expenses</p>
          <h2>₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          <p className="summary-note">Keep track of where your money goes.</p>
        </div>
        <div className="summary-icon">↗</div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RECORD A TRANSACTION</p>
            <h2>{editingId ? "Update expense" : "Add a new expense"}</h2>
          </div>
          {editingId && <button className="text-button" type="button" onClick={cancelEdit}>Cancel edit</button>}
        </div>

        <form onSubmit={handleSubmit} className="expense-form">
          <label>
            Expense name
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Lunch" required />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Education</option>
              <option>Bills</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Amount (₹)
            <input name="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={handleChange} placeholder="0.00" required />
          </label>
          <label>
            Date
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </label>
          <button className="primary-button" type="submit">{editingId ? "Save changes" : "+ Add expense"}</button>
        </form>
        {message && <p className="message" role="status">{message}</p>}
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR ACTIVITY</p>
            <h2>Recent expenses <span className="count">{expenses.length}</span></h2>
          </div>
        </div>

        {loading ? <p className="empty-state">Loading expenses...</p> :
          expenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">＋</div>
              <h3>No expenses yet</h3>
              <p>Add your first expense using the form above.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Expense</th><th>Category</th><th>Date</th><th>Amount</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td className="expense-name">{expense.name}</td>
                      <td><span className="category">{expense.category}</span></td>
                      <td>{new Date(`${expense.date}T00:00:00`).toLocaleDateString("en-IN")}</td>
                      <td className="amount">₹{Number(expense.amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="actions">
                        <button className="edit-button" onClick={() => startEdit(expense)} type="button">Edit</button>
                        <button className="delete-button" onClick={() => deleteExpense(expense._id)} type="button">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </section>
      <footer>Personal Expense Tracker · MERN Stack Mini Project</footer>
    </main>
  );
}

export default App;
