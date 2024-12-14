import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Add/Add.css"; // Assuming the styles are similar

const EditProduct = ({ url }) => {
  const { productId } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState({
    pd_name: "",
    pd_ct_id: "", // Assuming category is an ID
    pd_price: "",
  });
  const [categories, setCategories] = useState([]); // To hold categories
  const navigate = useNavigate();

  // Fetch product data when the component mounts
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${url}/api/product/${productId}`);
        if (res.data.success) {
          setProduct(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product");
      }
    };

    const getCategories = async () => {
      try {
        const res = await axios.get(`${url}/api/category/`);
        if (res.data.success) {
          setCategories(res.data.data); // Assuming response has a 'data' key with categories
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    getProduct();
    getCategories();
  }, [productId, url]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/api/product/edit/${productId}`, product);
      if (res.data.success) {
        toast.success("Product updated successfully!");
        navigate("/products"); // Redirect to the products page after successful update
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="add">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-product-name flex-col">
          <div>
            <label>Product Name</label>
            <input type="text" name="pd_name" value={product.pd_name} onChange={handleChange} required />
          </div>
          <div>
            <label>Category</label>
            <select name="pd_ct_id" value={product.pd_ct_id} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.ct_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Price</label>
            <input type="number" name="pd_price" value={product.pd_price} onChange={handleChange} required />
          </div>
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
