import React, { useState, useEffect } from "react";

import putVenue from "../API/Venue/updateVenue";
import VenueForm from "../Forms/venueForm";

function UpdateVenue({ venueData, isModalOpen, closeModal }) {
  const [formData, setFormData] = useState({
    name: venueData.name || "",
    description: venueData.description || "",
    media: (venueData.media || []).map((image) => ({
      url: image.url,
      alt: image.alt,
    })),
    meta: venueData.meta || {},
    price: venueData.price !== "" ? parseInt(venueData.price) : 0,
    maxGuests: venueData.maxGuests !== "" ? parseInt(venueData.maxGuests) : 0,
    rating: venueData.rating !== "" ? parseInt(venueData.rating) : 0,
    location: {
      address: venueData.location?.address || "",
      city: venueData.location?.city || "",
      country: venueData.location?.country || "",
    },
  });

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
      const updatedMedia = formData.media.map((image, i) => {
        if (i === index) {
          return {
            ...image,
            [subKey]: value,
          };
        }
        return image;
      });

      setFormData((prevData) => ({
        ...prevData,
        media: updatedMedia,
      }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await putVenue(venueData.id, formData);
      closeModal();
      alert("You have successfully updated the venue!");
      window.location.reload();
    } catch (error) {
      alert("Something went wrong! Please try again later!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setFormData({
        name: venueData.name || "",
        description: venueData.description || "",
        media: (venueData.media || []).map((image) => ({
          url: image.url,
          alt: image.alt,
        })),
        meta: venueData.meta || {},
        price: venueData.price !== "" ? parseInt(venueData.price) : 0,
        maxGuests:
          venueData.maxGuests !== "" ? parseInt(venueData.maxGuests) : 0,
        rating: venueData.rating !== "" ? parseInt(venueData.rating) : 0,
        location: {
          address: venueData.location?.address || "",
          city: venueData.location?.city || "",
          country: venueData.location?.country || "",
        },
      });
    }
  }, [isModalOpen, venueData]);

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
      isUpdate={true}
    />
  );
}

export default UpdateVenue;
