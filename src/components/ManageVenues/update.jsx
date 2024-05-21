import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

import putVenue from "../API/Venue/updateVenue";

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
      console.log("Form Data:", formData);
      await putVenue(venueData.id, formData);
      closeModal();
      alert("You have successfully updated the venue!");
      window.location.reload();
    } catch (error) {
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
    <>
      <div className="modal-background"></div>
      <div className="modal flex justify-center">
        <div className="modal-content h-[80%] w-[90%]">
          <IoClose onClick={closeModal} className="close-button" />
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-2/3 flex-col justify-center gap-3 bg-background pb-20 pt-10"
          >
            <h2 className="mb-5 mt-2 flex justify-center text-2xl font-bold">
              Update Venue
            </h2>

            <div className="flex flex-col border px-2 py-5">
              <h3 className="mx-auto mb-2 text-lg font-semibold">Venue info</h3>
              {/* Name */}
              <div className="mx-auto mb-4 w-full md:w-1/2">
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
              </div>

              {/* Description */}
              <div className="mx-auto mb-4 w-full md:w-1/2">
                <label htmlFor="description" className="mb-2 block text-lg">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-input w-full border pl-4 focus:outline-none"
                  autoComplete="off"
                  placeholder=""
                  rows="4"
                  cols="10"
                  maxLength={600}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Media */}
            <div className="flex flex-col border px-2 py-5">
              <h3 className="mx-auto mb-2 text-lg font-semibold">
                Image and Image Description
              </h3>
              {formData.media.map((image, id) => (
                <div key={id} className="mx-auto mb-4 flex w-1/2 items-center">
                  <input
                    type="url"
                    id={`image_url_${id}`}
                    className="form-input mr-2 w-1/2 flex-1 border p-2 focus:outline-none "
                    autoComplete="off"
                    placeholder="Image URL"
                    name={`media.url`}
                    value={image.url}
                    onChange={(event) => handleChange(event, id)}
                    required
                  />
                  <input
                    type="text"
                    id={`image_alt_${id}`}
                    className="form-input mr-2 w-1/2 flex-1 border p-2 focus:outline-none"
                    autoComplete="off"
                    placeholder="Image Description"
                    name={`media.alt`}
                    value={image.alt}
                    onChange={(event) => handleChange(event, id)}
                    required
                  />
                  {id === formData.media.length - 1 &&
                    formData.media.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedia(id)}
                        className="ml-2 border px-2 py-1 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMedia}
                className="mx-auto border px-8 py-1 font-bold"
              >
                Add Image
              </button>
            </div>

            <div className="flex flex-col border px-2 py-5">
              <h3 className="mx-auto mb-2 text-lg font-semibold">
                Price & Guests
              </h3>
              {/* Price */}
              <div className="mx-auto mb-4 w-full md:w-1/2">
                <label htmlFor="price" className="mb-2 block text-lg">
                  Price per night
                </label>
                <input
                  type="number"
                  id="price"
                  min="1"
                  max="10000"
                  className="form-input h-8 w-full border pl-4 focus:outline-none"
                  autoComplete="off"
                  placeholder=""
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Max Guests */}
              <div className="mx-auto mb-4 w-full md:w-1/2">
                <label htmlFor="max_guests" className="mb-2 block text-lg">
                  Max guests
                </label>
                <input
                  type="number"
                  id="max_guests"
                  min="1"
                  max="20"
                  className="form-input h-8 w-full border pl-4 focus:outline-none"
                  autoComplete="off"
                  placeholder=""
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Rating */}
              <div className="mx-auto mb-4 w-full md:w-1/2">
                <label htmlFor="rating" className="mb-2 block text-lg">
                  Rating of the venue
                </label>
                <input
                  type="number"
                  id="rating"
                  min="1"
                  max="5"
                  className="form-input h-8 w-full border pl-4 focus:outline-none"
                  autoComplete="off"
                  placeholder=""
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-col border px-2 py-5">
              <h3 className="mx-auto mb-2 text-lg font-semibold">Amenities</h3>
              <div className="mx-auto mb-4 grid w-full grid-cols-2 md:w-1/2">
                <div className="mx-auto mb-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="wifi"
                    id="wifi"
                    className="form-checkbox mr-2 h-4 w-4"
                    checked={formData.meta.wifi}
                    onChange={handleChange}
                  />
                  <label htmlFor="wifi" className="text-lg">
                    Wifi
                  </label>
                </div>
                <div className="mx-auto mb-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="breakfast"
                    id="breakfast"
                    className="form-checkbox mr-2 h-4 w-4"
                    checked={formData.meta.breakfast}
                    onChange={handleChange}
                  />
                  <label htmlFor="breakfast" className="text-lg">
                    Breakfast
                  </label>
                </div>
                <div className="mx-auto mb-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="pets"
                    id="pets"
                    className="form-checkbox mr-2 h-4 w-4"
                    checked={formData.meta.pets}
                    onChange={handleChange}
                  />
                  <label htmlFor="pets" className="text-lg">
                    Pets
                  </label>
                </div>
                <div className="mx-auto mb-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="parking"
                    id="parking"
                    className="form-checkbox mr-2 h-4 w-4"
                    checked={formData.meta.parking}
                    onChange={handleChange}
                  />
                  <label htmlFor="parking" className="text-lg">
                    Parking
                  </label>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col border px-2 py-5">
              <h3 className="mx-auto mb-2 text-lg font-semibold">
                Venue Location
              </h3>
              <div className="mx-auto mb-4 w-full md:w-1/2">
                <div>
                  <label
                    htmlFor="location.address"
                    className="mb-2 block text-lg"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="location.address"
                    className="form-input h-8 w-full border pl-4 focus:outline-none"
                    autoComplete="off"
                    placeholder=""
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location.city" className="mb-2 block text-lg">
                    City
                  </label>
                  <input
                    type="text"
                    id="location.city"
                    className="form-input h-8 w-full border pl-4 focus:outline-none"
                    autoComplete="off"
                    placeholder=""
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="location.country"
                    className="mb-2 block text-lg"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="location.country"
                    className="form-input h-8 w-full border pl-4 focus:outline-none"
                    autoComplete="off"
                    placeholder=""
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Post Button */}
            <button
              type="submit"
              className="mx-auto border px-8 py-1 font-bold"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateVenue;
