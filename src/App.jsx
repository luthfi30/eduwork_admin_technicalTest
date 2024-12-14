import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddProduct from "./pages/Add/AddProduct";
import AddCategory from "./pages/Add/AddCategory";
import Product from "./pages/Product/List";
import Category from "./pages/Category/List";
import User from "./pages/User/User";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Register from "./pages/register/register";
import EditCategory from "./pages/Category/editCategory.jsx";
import EditProduct from "./pages/Product/editProduct.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login url={url} />} />
          <Route path="/Register" element={<Register url={url} />} />
          <Route path="/AddProduct" element={<ProtectedRoute element={<AddProduct url={url} />} />} />
          <Route path="/AddCategory" element={<ProtectedRoute element={<AddCategory url={url} />} />} />
          <Route path="/EditCategory/:categoryId" element={<ProtectedRoute element={<EditCategory url={url} />} />} />
          <Route path="/products" element={<ProtectedRoute element={<Product url={url} />} />} />
          <Route path="/EditProduct/:productId" element={<ProtectedRoute element={<EditProduct url={url} />} />} />
          <Route path="/category" element={<ProtectedRoute element={<Category url={url} />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders url={url} />} />} />
          <Route path="/user" element={<ProtectedRoute element={<User url={url} />} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
