import React, { useEffect, useState } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCategory = ({ url }) => {
  const [data, setData] = useState({
    ct_name: "", // Sesuai dengan nama kolom di database
  });

  const navigate = useNavigate(); // Menggunakan hook useNavigate untuk redirect

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value })); // Menggunakan dynamic key berdasarkan input name
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/category/add`, data); // Kirim data dalam JSON format
      if (response.data.success) {
        toast.success("Category added successfully!");
        navigate("/category"); // Redirect ke halaman "/category" jika berhasil
      } else {
        toast.error("Failed to add category!");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-product-name flex-col">
          <p>Category Name</p>
          <input
            onChange={onChangeHandler}
            value={data.ct_name}
            type="text"
            name="ct_name" // Disesuaikan dengan nama kolom
            placeholder="Enter category name"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
