import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getProfile from "../../components/API/Profile";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = localStorage.getItem("profileRefreshed");

    if (!refresh && location.state && location.state.refresh) {
      localStorage.setItem("profileRefreshed", "true");
      window.location.reload();
    }
  }, [location.state]);

  const [profile, setProfile] = useState(null);
  const [venueManager, setVenueManager] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  if(!accessToken) {
    navigate("/login");
  }

  useEffect(() => {
    async function fetchProfile() {
        try {
            const profileData = await getProfile();
            const userProfile = profileData.data;
            setProfile(userProfile);

            if(userProfile && userProfile.venueManager) {
                setVenueManager(true);
            }

        } catch (error) {
            console.log(error);
        }
    }
    fetchProfile();
  }, []);




  return <div>it works</div>
}

export default Profile;
