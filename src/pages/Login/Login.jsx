import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ url }) => {
  const [credentials, setCredentials] = useState({
    us_email: "",
    us_password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the URL to match your backend
      const response = await axios.post(`${url}/api/user/login`, credentials);

      // Check the response
      if (response.data.success) {
        // Save the token and user data in localStorage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        // Optionally, you could redirect the user to the dashboard or another page

        navigate("/products");
        window.location.reload(); // Redirect after successful login
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error occurred");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="us_email" placeholder="Email" value={credentials.us_email} onChange={handleChange} required />
        <input type="password" name="us_password" placeholder="Password" value={credentials.us_password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};
export default Login;
