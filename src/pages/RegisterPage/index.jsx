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

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    const finalValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: finalValue,
    }));
  }

  function handleVenueManagerCheckboxChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  }

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
      errors.email = "Email must be @stud.noroff.no!";
      isValid = false;
    }

    if (!validateName(formData.name)) {
      errors.name =
        "Name must not contain punctuation symbols apart from underscore and must be between 4 and 20 characters!";
      isValid = false;
    }

    if (!validatePassword(formData.password, 8)) {
      errors.password = "Password must have at least 8 characters!";
      isValid = false;
    }

    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Repeat password must be the same as password!";
      isValid = false;
    }

    if (formData.avatar.trim() !== "" && !validateURL(formData.avatar)) {
      errors.avatar = "Avatar must be a valid URL link!";
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
    <div className="mx-auto my-20 flex pt-20">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-1/2 flex-col justify-center gap-3 border bg-background py-20 shadow-md"
      >
        <h2 className="my-5 flex justify-center text-2xl font-bold">
          Register
        </h2>

        {/* Email */}
        <div className="mx-auto mb-4 w-1/2">
          <label htmlFor="register_email" className="mb-2 block text-lg">
            Email
          </label>
          <input
            type="email"
            id="register_email"
            className="form-input h-8 w-full border pl-4 focus:outline-none"
            autoComplete="off"
            placeholder=""
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="text-l mx-auto mt-2 text-orange">
              {errors.email}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="mx-auto mb-4 w-1/2">
          <label htmlFor="name" className="mb-2 block text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input h-8 w-full border pl-4 focus:outline-none"
            autoComplete="off"
            placeholder=""
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && (
            <div className="text-l mx-auto mt-2 text-orange">{errors.name}</div>
          )}
        </div>

        {/* Password */}
        <div className="mx-auto mb-4 w-1/2">
          <label htmlFor="register_password" className="mb-2 block text-lg">
            Password
          </label>
          <input
            type="password"
            id="register_password"
            className="form-input h-8 w-full border pl-4 focus:outline-none"
            minLength="8"
            autoComplete="off"
            placeholder=""
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="text-l mx-auto mt-2 text-orange">
              {errors.password}
            </div>
          )}
        </div>

        {/* Repeat Password */}
        <div className="mx-auto mb-4 w-1/2">
          <label htmlFor="repeat_password" className="mb-2 block text-lg">
            Repeat password
          </label>
          <input
            type="password"
            id="repeat_password"
            className="form-input h-8 w-full border pl-4 focus:outline-none"
            minLength="8"
            autoComplete="off"
            placeholder=""
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
          {errors.repeatPassword && (
            <div className="text-l mx-auto mt-2 text-orange">
              {errors.repeatPassword}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="mx-auto mb-4 w-1/2">
          <label htmlFor="avatar" className="mb-2 block text-lg">
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar"
            className="form-input h-8 w-full border pl-4 focus:outline-none"
            autoComplete="off"
            placeholder=""
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
          {errors.avatar && (
            <div className="text-l mx-auto mt-2 text-orange">
              {errors.avatar}
            </div>
          )}
        </div>

        {/* Venue Manager */}
        <div className="mx-auto mb-4 flex w-1/2 items-center justify-center">
          <input
            onChange={handleVenueManagerCheckboxChange}
            type="checkbox"
            name="venueManager"
            id="venueManager"
            className="form-checkbox mr-2 h-4 w-4"
          />
          <label htmlFor="venueManager" className="text-lg">
            Register as Venue Manager
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="register_button"
          className="mx-auto border px-8 py-1 font-bold"
        >
          Register
        </button>

        {/* Cancel Button */}
        <Link to="/login" className="mx-auto border px-8 py-1 font-bold">
          Cancel
        </Link>
      </form>
    </div>
  );
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@stud\.noroff\.no$/;
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
