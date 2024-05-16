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

  return (
    <div>
      <div>
        <img src={avatar.url} alt={avatar.alt} />
        <button>Edit Profile</button>
      </div>
      <div>
        <p>Email: {email}</p>
        <p>Name: {name}</p>
        <p>Venue Manager: {venueManager ? "Yes" : "No"}</p>
        {venueManager && <button>Create New Venue</button>}
      </div>
      {venueManager && venues && venues.length > 0 && (
        <MyVenues venues={venues} />
      )}
      {venueManager && (!venues || venues.length === 0) && (
        <>
          <h2>My Venues</h2>
          <p>You currently don't have any venues.</p>
        </>
      )}
      {bookings && bookings.length > 0 ? (
        <MyBookings bookings={bookings} />
      ) : (
        <>
          <h2>My Bookings</h2>
          <p>You currently don't have any upcoming bookings.</p>
        </>
      )}
    </div>
  );
}

export default Profile;
