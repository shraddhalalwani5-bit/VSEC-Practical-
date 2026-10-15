```javascript
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Display() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="page">
        <div className="display-card">
          <h1>No Details Found</h1>
          <p>Please fill in the registration form first.</p>

          <button onClick={() => navigate("/")}>
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="display-card">
        <h1>Registration Successful!</h1>
        <p>Your submitted details are below.</p>

        <div className="detail">
          <strong>Name:</strong>
          <span>{data.name}</span>
        </div>

        <div className="detail">
          <strong>Mobile Number:</strong>
          <span>{data.mobile}</span>
        </div>

        <div className="detail">
          <strong>Email ID:</strong>
          <span>{data.email}</span>
        </div>

        <button onClick={() => navigate("/")}>
          Back to Form
        </button>
      </div>
    </div>
  );
}

export default Display;
```