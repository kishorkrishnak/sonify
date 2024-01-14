import { Link } from "react-router-dom";
import { useAppContext } from "../../App";
import { ToolTip } from "../others";

const ProfileIcon = () => {
  const { profile } = useAppContext();
  return (
    <>
      {profile && (
        <ToolTip tip={profile?.display_name}>
          <Link
            state={{ profile: profile }}
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

export default ProfileIcon;
