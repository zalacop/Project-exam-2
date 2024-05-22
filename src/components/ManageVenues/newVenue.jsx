import React, { useState } from "react";

import postVenue from "../API/Venue/createVenue";
import VenueForm from "../Forms/venueForm";

function CreateVenue({ isModalOpen, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      breakfast: false,
      pets: false,
      parking: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newVenue = await postVenue(formData);
      closeModal();
      alert("You have successfully created a venue!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, index) => {
    const { name, value, type, checked } = event.target;
    const [mainKey, subKey] = name.split(".");

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }));
    } else if (mainKey === "media") {
      handleChangeMedia(event, index);
    } else if (mainKey === "location") {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [subKey]: value,
        },
      }));
    } else {
      const numericValue =
        name === "price" || name === "maxGuests" || name === "rating"
          ? Number(value)
          : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    }
  };

  const handleChangeMedia = (event, index) => {
    const { name, value } = event.target;
    const newMedia = [...formData.media];
    newMedia[index][name.split(".")[1]] = value;
    setFormData((prevData) => ({
      ...prevData,
      media: newMedia,
    }));
  };

  const addMedia = () => {
    setFormData((prevData) => ({
      ...prevData,
      media: [...prevData.media, { url: "", alt: "" }],
    }));
  };

  const removeMedia = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      media: prevData.media.filter((_, i) => i !== index),
    }));
  };

  if (!isModalOpen) return null;

  return (
    <VenueForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      addMedia={addMedia}
      removeMedia={removeMedia}
      closeModal={closeModal}
      isUpdate={false}
    />
  );
}

export default CreateVenue;
