import React, { useState } from 'react';
import './App.css';
import logo from "./logo-implemify.png";


function App() {
  const [formData, setFormData] = useState({
    UsrEnterOtp: "",
    EntityName: "UsrDepositAccount"
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "https://webhooks.creatio.com/webhooks/7df1ce6d-59e7-4c12-8ea2-fff49d6e6bfd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Form data sent successfully", response);
          // Optionally, reset the form fields after successful submission
          setFormData({ UsrEnterOtp: "", EntityName: "UsrDepositAccount" });
        } else {
          console.error("Failed to send form data");
        }
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
  };

  return (
    <div className="App">
      <img
        className="my-4"
        src={logo}
        style={{ maxWidth: "220px", margin: "0 auto" }}
        alt="Logo"
      />
      <h2 id='heading'>To verify your Email enter OTP</h2>

      <div className='verify-otp'>
        <input
          type="text"
          name='UsrEnterOtp'
          className="textarea"
          value={formData.UsrEnterOtp}
          onChange={inputHandle}
          placeholder="Enter your Otp"
        />
        <button className='action-button' onClick={handleSubmit}>Verify</button>
      </div>
    </div>
  );
}

export default App;
