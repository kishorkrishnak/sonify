import { useEffect, useState } from "react";
import Heart from "react-heart";
import toast from "react-hot-toast";
import { useAppContext } from "../../App";
import { apiRequest } from "../../services";

const HeartButton = ({ song }) => {
  const handleHeartClick = async () => {
    let toastMessage = "";

    try {
      await apiRequest({
        url: `/me/tracks?ids=${song?.id}`,
        method: saved ? "DELETE" : "PUT",
        authFlow: true,
      });

      toastMessage = saved
        ? "Song removed from library"
        : "Song added to library";
      setSaved(!saved);
    } catch (error) {
      toastMessage = "Could't complete the action";
    } finally {
      toast(toastMessage);
    }
  };

  const { colorTheme } = useAppContext();

  const iconColor = colorTheme === "dark" ? "transparent" : "black";
  const { isLoggedIn } = useAppContext();
  const [saved, setSaved] = useState(false);
  const isSaved = async () => {
    try {
      const response = await apiRequest({
        url: `/me/tracks/contains?&ids=${song?.id}`,
        authFlow: true,
      });
      setSaved(response[0]);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (isLoggedIn) isSaved();
  }, []);

  return (
    <div className="w-8">
      <Heart
        animationScale={1.25}
        inactiveColor="white"
        className={`h-[17px] border-none`}
        style={{
          height: "17px",
          fill: saved ? "red" : iconColor,
          border: "none",
        }}
        isActive={saved}
        onClick={handleHeartClick}
      />
    </div>
  );
};

export default HeartButton;
