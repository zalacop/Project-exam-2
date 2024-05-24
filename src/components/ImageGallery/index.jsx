import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import placeholder from "./../../assets/image-2935360_1920.png";

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

  const firstImage = data?.media?.[0] || {
    url: placeholder,
    alt: "Placeholder image",
  };
  const secondImage = data?.media?.[1];
  const thirdImage = data?.media?.[2];

  return (
    <>
      <div className="mx-auto my-10 w-[90%]">
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-3">
          <div className="lg:w-2/3">
            <img
              src={firstImage.url}
              alt={firstImage.alt}
              className="h-full max-h-[800px] min-h-[200px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-3 lg:w-1/3">
            {secondImage && (
              <img
                src={secondImage.url}
                alt={secondImage.alt}
                className="h-1/2 max-h-[400px] w-full object-cover md:h-1/2"
              />
            )}
            {thirdImage && (
              <img
                src={thirdImage.url}
                alt={thirdImage.alt}
                className="h-1/2 max-h-[400px] w-full object-cover"
              />
            )}
            {data?.media?.length > 3 && (
              <div className="flex justify-center">
                <button
                  onClick={openModal}
                  className="mx-auto w-max border-4 border-dark-green bg-dark-green px-8 py-1 font-semibold text-background"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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
