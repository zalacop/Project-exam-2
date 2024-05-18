import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";

import putProfile from "../API/Profile/update";

function EditProfile({ isModalOpen, closeModal }) {
  const [newFormData, setNewFormData] = useState({
    avatar: { url: "", alt: "" },
    venueManager: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;
    setNewFormData((prevState) => ({
      ...prevState,
      [name]: finalValue,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await putProfile({
        avatar: { url: newFormData.avatar, alt: "profile avatar" },
        venueManager: newFormData.venueManager,
      });

      window.location.reload();
    } catch (error) {
      alert("Oops, something went wrong with updating the profile!");
      console.error(error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <>
      <div className="modal-background"></div>
      <div className="modal flex justify-center">
        <div className="modal-content h-[80%] w-[90%]">
          <IoClose onClick={closeModal} className="close-button" />
          <form onSubmit={handleSubmit}>
            <h2 className="my-5 flex justify-center text-2xl font-bold">
              Edit Profile
            </h2>

            {/* Avatar URL */}
            <div className="mx-auto mb-4 w-1/2">
              <label htmlFor="avatarUrl" className="mb-2 block text-lg">
                Avatar URL
              </label>
              <input
                type="text"
                id="avatarUrl"
                className="form-input h-8 w-full border pl-4 focus:outline-none"
                autoComplete="off"
                placeholder="Enter avatar URL"
                name="avatar"
                value={newFormData.avatar.url}
                onChange={handleChange}
              />
            </div>

            {/* Avatar Alt Text */}
            <div className="mx-auto mb-4 w-1/2">
              <label htmlFor="avatarAlt" className="mb-2 block text-lg">
                Avatar Alt Text
              </label>
              <input
                type="text"
                id="avatarAlt"
                className="form-input h-8 w-full border pl-4 focus:outline-none"
                autoComplete="off"
                placeholder="Enter avatar alt text"
                name="avatarAlt"
                value={newFormData.avatar.alt}
                onChange={handleChange}
              />
            </div>

            {/* Venue Manager */}
            <div className="mx-auto mb-4 flex w-1/2 items-center justify-center">
              <input
                onChange={handleChange}
                type="checkbox"
                name="venueManager"
                id="venueManager"
                className="form-checkbox mr-2 h-4 w-4"
                checked={newFormData.venueManager}
              />
              <label htmlFor="venueManager" className="text-lg">
                Register as Venue Manager
              </label>
            </div>

            <button type="submit" className="mx-auto w-max border px-8 py-1 font-bold flex">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
