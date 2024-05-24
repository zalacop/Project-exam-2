import React from "react";
import { IoClose } from "react-icons/io5";

const VenueForm = ({
  formData,
  handleChange,
  handleSubmit,
  addMedia,
  removeMedia,
  closeModal,
  isUpdate,
}) => {
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
              {isUpdate ? "Update Venue" : "Create New Venue"}
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
                  maxLength={1000}
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
                    name="media.url"
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
                    name="media.alt"
                    value={image.alt}
                    onChange={(event) => handleChange(event, id)}
                    required
                  />
                  {id === formData.media.length - 1 &&
                    formData.media.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedia(id)}
                        className="mb-2 ml-2 border-4 border-orange px-1.5 py-1 font-semibold"
                        id="delete"
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMedia}
                className="mx-auto w-max border-4 border-dark-green bg-dark-green px-8 py-1 font-semibold text-background"
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
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto flex w-1/2 justify-between">
              <button
                type="submit"
                className="mx-auto w-max border-4 border-dark-green bg-dark-green px-8 py-1 font-semibold text-background"
              >
                {isUpdate ? "Save" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VenueForm;
