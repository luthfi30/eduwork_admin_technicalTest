import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Category = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Function to fetch the list of categories
  const getList = async () => {
    try {
      const res = await axios.get(`${url}/api/category/`);

      if (Array.isArray(res.data.data) && res.data.data.length > 0) {
        setList(res.data.data); // If the response contains categories, set them in the list state
        console.log("Categories Data:", res.data.data); // Log the categories data
      } else {
        toast.error("No categories available");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  // Function to handle editing category
  const handleEditCategory = (categoryId) => {
    navigate(`/EditCategory/${categoryId}`);
  };

  // Function to remove a category
  const removeCategory = async (categoryId) => {
    try {
      const res = await axios.delete(`${url}/api/category/${categoryId}`); // DELETE request
      if (res.data.success) {
        toast.success(res.data.message);
        getList(); // Refresh the list after successful removal
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error removing category:", error);
      toast.error("Failed to remove category");
    }
  };
  // Fetch the category list when the component mounts
  useEffect(() => {
    getList();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div className="list add flex-col">
      <p>All Categories</p>
      <div className="list-table">
        <NavLink to={"/AddCategory"}>
          <button className="btn add-btn" style={{ marginBottom: "10px" }}>
            <p style={{ color: "white" }}>Add Items</p>
          </button>
        </NavLink>
        <div className="list-table-format title">
          <b>Name</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div className="list-table-format" key={index}>
              <p>{item.ct_name}</p> {/* Assuming ct_name is the category name */}
              <div className="actions">
                <button className="btn edit-btn" onClick={() => handleEditCategory(item._id)}>
                  Edit
                </button>
                <button className="btn delete-btn" onClick={() => removeCategory(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available</p> // This will display if the list is empty
        )}
      </div>
    </div>
  );
};

export default Category;
