import React, { useEffect, useState } from "react";
import { apiRequest } from "../../../utils";
import ToolTip from "../../misc/ToolTip";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiRequest({
          url: "/me",
          authFlow: true,
        });
        if (response && !response.status) setProfile(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchUserProfile();
  }, []);
  return (
    <>
      {profile && (
        <ToolTip tip={profile?.display_name}>
          <Link
            state={{ profile:profile}}
            to={"/profile"}
            className="scale-100 hover:scale-105 cursor-pointer"
          >
            <img
              className="transition-all h-[35px] w-[35px] rounded-full border border-black border-4"
              src={profile?.images[0]?.url}
              alt="user"
            />
          </Link>
        </ToolTip>
      )}
    </>
  );
};

export default Profile;
