import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Product = ({ url }) => {
  const [list, setList] = useState([]);

  // Function to fetch the list of products
  const getList = async () => {
    try {
      const res = await axios.get(`${url}/api/product/`);
      console.log(res); // Log full response for debugging
      // Cek apakah respons memiliki struktur data yang benar
      if (res.data?.data && Array.isArray(res.data.data)) {
        setList(res.data.data); // Akses data dari res.data.data
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // Function to remove a product
  const removeProduct = async (productId) => {
    try {
      const res = await axios.delete(`${url}/api/product/remove/${productId}`); // Updated URL with "/remove"
      if (res.data.success) {
        toast.success(res.data.message);
        getList(); // Refresh the list after successful removal
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product");
    }
    getList();
  };

  // Fetch the product list when the component mounts
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Products List</p>
      <div className="list-table">
        <NavLink to={"/AddProduct"}>
          <button className="btn add-btn" style={{ marginBottom: "10px" }}>
            <p style={{ color: "white" }}>Add Items</p>
          </button>
        </NavLink>
        <div className="list-table-format title">
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div className="list-table-format" key={index}>
              <p>{item.pd_name}</p>
              <p>{item.pd_ct_id?.ct_name || "No Category"}</p> {/* Safely access category */}
              <p>{item.pd_price}</p>
              <div className="actions">
                <NavLink to={`/EditProduct/${item._id}`}>
                  <button className="btn edit-btn">Edit</button>
                </NavLink>
                <button className="btn delete-btn" onClick={() => removeProduct(item._id)}>
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p> // Handle empty state
        )}
      </div>
    </div>
  );
};

export default Product;
