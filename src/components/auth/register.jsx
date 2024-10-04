/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS toastify
import { z } from "zod"; // Import Zod
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Skema validasi menggunakan Zod
const registerSchema = z.object({
  fullname: z
    .string()
    .min(4, { message: "Nama harus memiliki minimal 4 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password harus memiliki minimal 8 karakter" })
    .regex(/[a-zA-Z]/, { message: "Password harus mengandung huruf " })
    .regex(/[0-9]/, { message: "Password harus mengandung angka " })
    .regex(/[\W_]/, { message: "Password harus mengandung simbol " }),
  phoneNumber: z
    .string()
    .min(10, { message: "Nomor HP harus memiliki minimal 10 digit" })
    .regex(/^\d+$/, { message: "Nomor HP hanya boleh berisi angka" }),
  role: z.enum(["user", "admin"]),
});

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State untuk kontrol show/hide password
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    const togglePasswordIcon = document.querySelector(".toggle-password-icon");
    if (showPassword) {
      togglePasswordIcon.classList.remove("fa-eye-slash");
      togglePasswordIcon.classList.add("fa-eye");
    } else {
      togglePasswordIcon.classList.remove("fa-eye");
      togglePasswordIcon.classList.add("fa-eye-slash");
    }
  };

  const validateField = (name, value) => {
    try {
      registerSchema.pick({ [name]: true }).parse({ [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.errors[0].message,
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = registerSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        formData
      );
      toast.success(response.data.message || "Registrasi Berhasil");

      // Kosongkan form setelah sukses registrasi
      setFormData({
        fullname: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
      });

      // Arahkan ke halaman login setelah registrasi berhasil
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data.message || "Registrasi Gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer /> {/* Container untuk Toastify */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.fullname}
          onBlur={(e) => validateField("fullname", e.target.value)} // Validasi onBlur
          required
          className="w-full mb-4 p-2 border rounded"
        />
        {errors.fullname && (
          <p className="text-red-500 text-sm">{errors.fullname}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          onBlur={(e) => validateField("email", e.target.value)} // Validasi onBlur
          required
          className="w-full mb-4 p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Field nomor HP */}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Nomor HP"
          onChange={handleChange}
          value={formData.phoneNumber}
          onBlur={(e) => validateField("phoneNumber", e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        )}
        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"} // Ganti tipe input berdasarkan state
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            onBlur={handleBlur}
            required
            className="w-full p-2 border rounded"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <FontAwesomeIcon
              className={`toggle-password-icon ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              icon={showPassword ? faEyeSlash : faEye}
            />
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="" disabled>
            Pilih Role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
