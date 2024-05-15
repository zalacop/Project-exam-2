import React, { useState } from "react";
import RegisterUser from "../../components/API/Auth/Register";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    avatar: "",
    isVenueManager: false,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const newValue = type === "checkbox" ? checked : value;
    const finalValue = name === "isVenueManager" ? checked : newValue;

    setFormData((prevState) => ({
      ...prevState,
      [name]: finalValue,
    }));
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!validateEmail(formData.email)) {
      errors.email = "Email must be @stud.noroff.no";
      isValid = false;
    }

    if (!validateName(formData.name)) {
      errors.name =
        "Name must not contain punctuation symbols apart from underscore and must be between 4 and 20 characters";
      isValid = false;
    }

    if (!validatePassword(formData.password, 8)) {
      errors.password = "Password must have at least 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Repeat password must be the same as password";
      isValid = false;
    }

    // Validate Avatar (if not empty)
    if (formData.avatar.trim() !== "" && !validateURL(formData.avatar)) {
      errors.avatar = "Avatar must be a valid URL link";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const data = await RegisterUser(formData);
        navigate("/login");
      } catch (error) {
        alert("Oops, something went wrong with registration!");
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white mx-auto max-w-md rounded-lg p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl">Register</h2>
      {/* Email */}
      {errors.email && <div className="text-red-500 mb-4">{errors.email}</div>}
      <div className="mb-4">
        <label htmlFor="register_email" className="mb-2 block text-lg">
          Email
        </label>
        <input
          type="email"
          id="register_email"
          className="form-input w-full"
          autoComplete="off"
          placeholder=""
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      {/* Name */}
      {errors.name && <div className="text-red-500 mb-4">{errors.name}</div>}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-lg">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-input w-full"
          autoComplete="off"
          placeholder=""
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      {/* Password */}
      {errors.password && (
        <div className="text-red-500 mb-4">{errors.password}</div>
      )}
      <div className="mb-4">
        <label htmlFor="register_password" className="mb-2 block text-lg">
          Password
        </label>
        <input
          type="password"
          id="register_password"
          className="form-input w-full"
          minLength="8"
          autoComplete="off"
          placeholder=""
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {/* Repeat Password */}
      {errors.repeatPassword && (
        <div className="text-red-500 mb-4">{errors.repeatPassword}</div>
      )}
      <div className="mb-4">
        <label htmlFor="repeat_password" className="mb-2 block text-lg">
          Repeat password
        </label>
        <input
          type="password"
          id="repeat_password"
          className="form-input w-full"
          minLength="8"
          autoComplete="off"
          placeholder=""
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
        />
      </div>
      {/* Avatar */}
      {errors.avatar && (
        <div className="text-red-500 mb-4">{errors.avatar}</div>
      )}
      <div className="mb-4">
        <label htmlFor="avatar" className="mb-2 block text-lg">
          Avatar URL
        </label>
        <input
          type="text"
          id="avatar"
          className="form-input w-full"
          autoComplete="off"
          placeholder=""
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
        />
      </div>
      {/* Venue Manager */}
      <div className="mb-4">
        <input
          type="checkbox"
          id="isVenueManager"
          name="isVenueManager"
          className="form-checkbox mr-2 h-4 w-4"
          checked={formData.isVenueManager}
          onChange={handleChange}
        />
        <label htmlFor="isVenueManager" className="text-lg">
          I am a Venue Manager
        </label>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        id="register_button"
        className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2 text-lg"
      >
        Register
      </button>
      {/* Cancel Button */}
      <Link
        to="/login"
        className="text-blue-500 hover:text-blue-600 mt-4 block text-center"
      >
        Cancel
      </Link>
    </form>
  );
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  return nameRegex.test(name);
};

const validatePassword = (password, minLength) => {
  return password.length >= minLength;
};

export default Register;
