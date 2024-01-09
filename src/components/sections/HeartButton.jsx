import Heart from "react-heart";
import toast from "react-hot-toast";
import { useAppContext } from "../../App";
import { apiRequest } from "../../services";
import { useEffect, useState } from "react";

const HeartButton = ({ song }) => {
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
    isSaved();
  }, []);
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

  const iconColor = colorTheme === "dark" ? "white" : "black";

  return (
    <div style={{ width: "2rem" }}>
      <Heart
        animationScale={1.25}
        inactiveColor="white"
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
