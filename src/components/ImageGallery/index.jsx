import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ImageGallery = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {data && data.media && data.media.length > 0 && (
        <div className="mx-auto my-10 w-[90%]">
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-3">
            <div className="lg:w-2/3">
              <img
                src={data.media[0]?.url}
                alt={data.media[0]?.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-3 lg:w-1/3">
              {data.media.length > 1 && (
                <img
                  src={data.media[1]?.url}
                  alt={data.media[1]?.alt}
                  className="h-full w-full object-cover"
                />
              )}
              {data.media.length > 2 && (
                <img
                  src={data.media[2]?.url}
                  alt={data.media[2]?.alt}
                  className="h-full w-full object-cover"
                />
              )}
              {data.media.length > 3 && (
                <div className="flex justify-center">
                  <button
                    onClick={openModal}
                    className="mt-2 border px-8 py-1 font-bold"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <>
          <div className="modal-background"></div>
          <div className="modal flex justify-center">
            <div className="modal-content h-[80%] w-[90%]">
              <IoClose onClick={closeModal} className="close-button" />
              <div className="grid grid-cols-2 gap-4">
                {data.media.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.alt}
                    className="h-auto w-full object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ImageGallery;
