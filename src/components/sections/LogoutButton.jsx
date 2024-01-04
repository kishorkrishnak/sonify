import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";

const LogoutButton = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_API_URL;
  const navigate = useNavigate();
  const { setToken } = useAppContext();

  const handleLogout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${backendUrl}/auth/logout`);
        if (response.data.message) {
          console.log(response.data.message);
          setToken("");
          navigate("/");
          resolve("Successfully logged out");
        } else {
          console.log("Unexpected response:", response);
          reject("Unexpected response");
        }
      } catch (error) {
        console.error("Error logging out:", error);
        reject(error.message || "Error logging out");
      }
    });
  };

  return (
    <Link
      onClick={() =>
        toast.promise(handleLogout(), {
          loading: "Logging out...",
          success: <b>Logged out succesfully!</b>,
          error: <b>Could not logout.</b>,
        })
      }
      className="bg-[#3C3E4D] text-white w-fit px-3 py-1 rounded-md"
    >
      {" "}
      Logout
    </Link>
  );
};

export default LogoutButton;
