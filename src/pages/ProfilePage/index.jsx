import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();

  useEffect(() => {
    const refreshFlag = localStorage.getItem("profileRefreshed");

    if (!refreshFlag && location.state && location.state.refresh) {
      localStorage.setItem("profileRefreshed", "true");
      window.location.reload();
    }
  }, [location.state]);

  return <div>it works</div>;
}

export default Profile;
