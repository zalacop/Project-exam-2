import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import getProfile from "../API/Profile";
import Spinner from "../Spinner";
import CreateVenue from "../ManageVenues/newVenue";
import EditProfile from "./editProfile";
import MyVenues from "./venues";
import MyBookings from "./bookings";

function ShowProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateVenueModalOpen, setIsCreateVenueModalOpen] = useState(false);

  useEffect(() => {
    const refresh = localStorage.getItem("profileRefreshed");

    if (!refresh && location.state && location.state.refresh) {
      localStorage.setItem("profileRefreshed", "true");
      window.location.reload();
    }
  }, [location.state]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, [accessToken, navigate]);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openCreateVenueModal = () => {
    setIsCreateVenueModalOpen(true);
  };

  const closeCreateVenueModal = () => {
    setIsCreateVenueModalOpen(false);
  };

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      const userProfile = profileData.data;
      setProfile(userProfile);
      localStorage.setItem("avatarUrl", userProfile.avatar.url);
      localStorage.setItem("avatarAlt", userProfile.avatar.alt);
      localStorage.setItem("venueManager", userProfile.venueManager);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileUpdate = async () => {
    await fetchProfile();
  };

  if (!profile) {
    return <Spinner />;
  }

  const { venues, bookings, avatar, email, name, venueManager } = profile;

  return (
    <>
      <div className="mx-auto mb-8 mt-20 flex max-w-[1200px] flex-col justify-center gap-20 md:flex-row md:items-start md:gap-5">
        <div className="mb-4 flex flex-col gap-5 md:mb-0 md:ml-20 md:mr-8 md:justify-center md:text-center">
          <img
            src={avatar.url}
            alt={avatar.alt}
            className="mx-auto mb-4 h-60 w-60 md:mb-0"
          />
          <button
            className="mx-auto w-max border-4 border-dark-green bg-dark-green px-5 py-1 font-semibold text-background"
            onClick={openEditModal}
          >
            Edit Profile
          </button>
        </div>

        <EditProfile
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          onProfileUpdate={handleProfileUpdate}
        />

        <div className="mx-auto my-auto border p-10 px-20 text-center sm:w-[90%] md:max-w-[450px] md:text-left">
          <div className="mx-auto sm:w-3/4">
            <p className="mb-2">Email: {email}</p>
            <p className="mb-2">Name: {name}</p>
            <p className="mb-2">Venue Manager: {venueManager ? "Yes" : "No"}</p>
            {venueManager && (
              <button
                className="mx-auto w-max border-4 border-dark-green bg-dark-green px-5 py-1 font-semibold text-background"
                onClick={openCreateVenueModal}
              >
                Create New Venue
              </button>
            )}
          </div>
        </div>
      </div>

      <CreateVenue
        isModalOpen={isCreateVenueModalOpen}
        closeModal={closeCreateVenueModal}
      />

      <div>
        {venueManager && venues && venues.length > 0 && (
          <MyVenues venues={venues} />
        )}
        {venueManager && (!venues || venues.length === 0) && (
          <div className="mx-auto my-10 w-3/4 max-w-[1200px] border px-10 py-5">
            <h2 className="mb-4 text-xl font-bold">My Venues</h2>
            <p>You currently don't have any venues.</p>
          </div>
        )}
      </div>

      <div>
        {bookings && bookings.length > 0 && <MyBookings bookings={bookings} />}
        {bookings && bookings.length === 0 && (
          <div className="mx-auto w-3/4 max-w-[1200px] border px-10 py-5">
            <h2 className="mb-4 text-xl font-bold">My Bookings</h2>
            <p>You currently don't have any upcoming bookings.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowProfile;
