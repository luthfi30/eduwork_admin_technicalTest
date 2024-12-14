import React, { useState, useEffect } from "react";
import "../Add/Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = ({ url }) => {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState({ ct_name: "" });
  const navigate = useNavigate();

  // Fetch the category data when the component mounts
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(`${url}/api/category/${categoryId}`);
        if (res.data.success) {
          setCategory(res.data.data); // Set the category data in the state
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Failed to fetch category");
      }
    };
    getCategory();
  }, [categoryId]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Handle form submission to update the category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/api/category/${categoryId}`, category);
      navigate("/category");
      console.log("API Response:", res); // Log untuk memverifikasi respons
      if (res.data.success) {
        toast.success("Category updated successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="add">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-product-name flex-col">
          <div>
            <label>Category Name</label>
            <input type="text" name="ct_name" value={category.ct_name} onChange={handleChange} required />
          </div>
          <button type="submit">Update Category</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
