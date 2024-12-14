import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData)); // Set user data if token is present
    }
  }, []);

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="right">
        <p>Admin Dashboard</p>
      </div>
      <div className="left">
        <div className="logout">
          {user ? (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>{user.email}</p> {/* Display user email */}
                <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p>Admin</p> // Default message when not logged in
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
