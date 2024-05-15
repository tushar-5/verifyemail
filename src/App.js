import React, { useState } from 'react';
import './App.css';
import logo from "./logo-implemify.png";


function App() {
  const [formData, setFormData] = useState({
    UsrEnterOtp: "",
    EntityName: "Webhook"
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(true);

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.UsrEnterOtp) {
      alert("Please enter your OTP.");
      return; // Prevent form submission if OTP is not entered
    }
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
          console.log("Form data sent successfully");
          setFormData({ UsrEnterOtp: "", EntityName: "UsrVerifyEmail" });
          setSuccessMessage("");
          setShowForm(false)
          setSuccessMessage("Your OTP submitted successfully");
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
      {showForm && ( // Render the form only if formVisible is true
        <>
          <h2 id='heading'>To verify your Email enter OTP</h2>

          <div className='verify-otp'>
            <input
              type="text"
              name='UsrEnterOtp'
              className="textarea"
              value={formData.UsrEnterOtp}
              onChange={inputHandle}
              placeholder="Enter your Otp"
              required
            />
            <button className='action-button' onClick={handleSubmit}>Verify</button>
          </div>
        </>
      )}
      {successMessage && (
        <p style={{ color: "green" }}>{successMessage}</p>
      )}
    </div>
  );
}

export default App;
