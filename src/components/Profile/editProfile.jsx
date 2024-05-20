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

    const avatar = parseJSON(localStorage.getItem("avatar"), { url: "", alt: "" });
    const initialVenueManager = parseJSON(localStorage.getItem("venueManager"), false);

    const [editForm, setEditForm] = useState({
        newAvatar: avatar,
        venueManager: initialVenueManager,
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
            await putProfile({
                avatar: editForm.newAvatar,
                venueManager: editForm.venueManager,
            });
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
                    <form onSubmit={handleSubmit}>
                        <h2 className="my-5 flex justify-center text-2xl font-bold">
                            Edit Profile
                        </h2>

                        <div className="mx-auto mb-4 w-1/2">
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

                        <div className="mx-auto mb-4 w-1/2">
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

                        <button type="submit" className="mx-auto w-max border px-8 py-1 font-bold flex">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditProfile;
