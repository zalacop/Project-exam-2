import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getProfile from "../../components/API/Profile";
import MyVenues from "../../components/Profile/venues";
import MyBookings from "../../components/Profile/bookings";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );

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
      async function fetchProfile() {
        try {
          const profileData = await getProfile();
          const userProfile = profileData.data;
          setProfile(userProfile);
          setAccessToken(localStorage.getItem("accessToken"));
        } catch (error) {
          console.log(error);
        }
      }
      fetchProfile();
    }
  }, [accessToken, navigate]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const { venues, bookings, avatar, email, name, venueManager } = profile;

  console.log(bookings)
  return (
    <>
      <div className="mx-auto mb-8 mt-20 flex flex-col justify-center gap-20 md:flex-row md:items-start">
        <div className="mb-4 flex flex-col gap-5 md:mb-0 md:mr-8 md:justify-center md:text-center">
          <img
            src={avatar.url}
            alt={avatar.alt}
            className="mx-auto mb-4 h-60 w-60 md:mb-0"
          />
          <button className="mx-auto w-max border px-8 py-1 font-bold">
            Edit Profile
          </button>
        </div>
        <div className="my-auto border p-10 px-20 text-center md:text-left">
          <div className="mx-auto sm:w-3/4">
            <p className="mb-2">Email: {email}</p>
            <p className="mb-2">Name: {name}</p>
            <p className="mb-2">Venue Manager: {venueManager ? "Yes" : "No"}</p>
            {venueManager && (
              <button className="mx-auto w-max border px-8 py-1 font-bold">
                Create New Venue
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        {venueManager && venues && venues.length > 0 && (
          <MyVenues venues={venues} />
        )}
        {venueManager && (!venues || venues.length === 0) && (
          <div className="mx-auto my-10 w-3/4 border px-10 py-5">
            <h2 className="mb-4 text-xl font-bold">My Venues</h2>
            <p>You currently don't have any venues.</p>
          </div>
        )}
      </div>

      <div>
        {bookings && bookings.length > 0 && <MyBookings bookings={bookings} />}
        {bookings && bookings.length === 0 && (
          <div className="mx-auto w-3/4 border px-10 py-5">
            <h2 className="mb-4 text-xl font-bold">My Bookings</h2>
            <p>You currently don't have any upcoming bookings.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
