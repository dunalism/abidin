/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import baseURL from "../../lib-axios/baseUrl";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${baseURL}/users?email=${formData.email}&password=${formData.password}`
      );

      if (response.data.length > 0) {
        toast.success("Login Berhasil");

        localStorage.setItem("userId", response.data[0].id);
        localStorage.setItem("logged", formData.email);
        // Post ke https://json-server-flax-six.vercel.app
        await axios.post(`${baseURL}/logged`, {
          email: formData.email,
          password: formData.password,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Invalid Kredensial");
      }
    } catch (error) {
      toast.error("Login Gagal");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"} // Ganti tipe input berdasarkan state
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="w-full p-2 border rounded"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
