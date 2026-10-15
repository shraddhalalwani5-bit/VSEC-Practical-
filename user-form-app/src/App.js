import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    mobile: "",
    email: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function goBack() {
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="card">
          <h1>Registration Successful!</h1>
          <p className="subtitle">Your submitted information</p>

          <div className="details">
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Surname:</strong> {form.surname}</p>
            <p><strong>Mobile Number:</strong> {form.mobile}</p>
            <p><strong>Email ID:</strong> {form.email}</p>
          </div>

          <button onClick={goBack}>Back to Form</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>User Registration Form</h1>
        <p className="subtitle">Please enter your details below</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Surname</label>
          <input
            type="text"
            name="surname"
            placeholder="Enter your surname"
            value={form.surname}
            onChange={handleChange}
            required
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter 10-digit mobile number"
            value={form.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a 10-digit mobile number"
            required
          />

          <label>Email ID</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Details</button>
        </form>
      </div>
    </div>
  );
}

export default App;