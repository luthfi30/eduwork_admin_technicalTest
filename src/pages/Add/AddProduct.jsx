import React, { useEffect, useState } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ url }) => {
  const [data, setData] = useState({
    pd_name: "",
    pd_price: "",
    pd_ct_id: "",
  });
  const [categories, setCategories] = useState([]); // Untuk menyimpan daftar kategori
  const navigate = useNavigate();

  // Memuat kategori dari server saat komponen dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/category`);
        if (response.data.success) {
          setCategories(response.data.data); // Asumsikan data berisi array kategori
        } else {
          toast.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("An error occurred while loading categories");
      }
    };

    fetchCategories();
  }, [url]);

  // Mengatur data input
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Menangani pengiriman formulir
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/product/add`, data);

      // Pastikan format respons sesuai ekspektasi
      if (response.data.success) {
        toast.success(response.data.message); // Menampilkan pesan sukses
        setData({
          pd_name: "",
          pd_price: "",
          pd_ct_id: "",
        });
        navigate("/products"); // Redirect setelah berhasil
      } else {
        // Jika respons tidak sukses, tampilkan pesan error
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.pd_name} type="text" name="pd_name" placeholder="Product name" required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.pd_ct_id} name="pd_ct_id" required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.ct_name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.pd_price} type="number" name="pd_price" placeholder="Enter price" required />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
