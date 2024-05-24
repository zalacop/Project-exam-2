import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import putProfile from "../API/Profile/update";

function EditProfile({ isModalOpen, closeModal, onProfileUpdate }) {
  const parseJSON = (value, fallback) => {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  const defaultAvatar = { url: "", alt: "" };
  const defaultVenueManager = false;

  const avatar = parseJSON(localStorage.getItem("avatar"), defaultAvatar);
  const venueManager = parseJSON(
    localStorage.getItem("venueManager"),
    defaultVenueManager,
  );

  const [editForm, setEditForm] = useState({
    newAvatar: avatar || defaultAvatar,
    venueManager: venueManager || defaultVenueManager,
  });

  useEffect(() => {
    localStorage.setItem("avatar", JSON.stringify(editForm.newAvatar));
    localStorage.setItem("venueManager", JSON.stringify(editForm.venueManager));
  }, [editForm]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setEditForm((prevState) => ({
        ...prevState,
        venueManager: checked,
      }));
    } else {
      setEditForm((prevState) => ({
        ...prevState,
        newAvatar: {
          ...prevState.newAvatar,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileUpdates = {};
      if (editForm.newAvatar.url !== "" || editForm.newAvatar.alt !== "") {
        profileUpdates.avatar = editForm.newAvatar;
      }
      if (editForm.venueManager !== venueManager) {
        profileUpdates.venueManager = editForm.venueManager;
      }

      if (Object.keys(profileUpdates).length === 0) {
        closeModal();
        return;
      }

      await putProfile(profileUpdates);
      alert("Profile updated successfully!");
      onProfileUpdate();
      closeModal();
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
          <form onSubmit={handleSubmit}
          className="max-w-[1000px] mx-auto">
            <h2 className="my-5 flex justify-center text-2xl font-bold">
              Edit Profile
            </h2>

            <div className="mx-auto mb-4 w-2/3">
              <label htmlFor="url" className="mb-2 block text-lg">
                Avatar URL
              </label>
              <input
                type="url"
                id="url"
                className="form-input h-8 w-full border pl-4 focus:outline-none"
                autoComplete="off"
                name="url"
                value={editForm.newAvatar.url}
                onChange={handleChange}
              />
            </div>

            <div className="mx-auto mb-4 w-2/3">
              <label htmlFor="alt" className="mb-2 block text-lg">
                Avatar Alt Text
              </label>
              <input
                type="text"
                id="alt"
                className="form-input h-8 w-full border pl-4 focus:outline-none"
                autoComplete="off"
                name="alt"
                value={editForm.newAvatar.alt}
                onChange={handleChange}
              />
            </div>

            <div className="mx-auto mb-4 flex w-1/2 items-center justify-center">
              <input
                onChange={handleChange}
                type="checkbox"
                name="venueManager"
                id="venueManager"
                className="form-checkbox mr-2 h-4 w-4"
                checked={editForm.venueManager}
              />
              <label htmlFor="venueManager" className="text-lg">
                Register as Venue Manager
              </label>
            </div>

            <button
              type="submit"
              className="mx-auto flex w-max border-4 border-dark-green bg-dark-green px-8 py-1 font-semibold text-background"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
