import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = ({ url }) => {
  const [formData, setFormData] = useState({
    us_name: "",
    us_email: "",
    us_password: "",
    us_phone_number: "",
    us_address: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/user/register`, formData);
      alert("User registered successfully");
      navigate("/"); // Redirect to login page
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error occurred");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="us_name" placeholder="Full Name" value={formData.us_name} onChange={handleChange} required />
        <input type="email" name="us_email" placeholder="Email" value={formData.us_email} onChange={handleChange} required />
        <input type="password" name="us_password" placeholder="Password" value={formData.us_password} onChange={handleChange} required />
        <input type="text" name="us_phone_number" placeholder="Phone Number" value={formData.us_phone_number} onChange={handleChange} />
        <input type="text" name="us_address" placeholder="Address" value={formData.us_address} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
