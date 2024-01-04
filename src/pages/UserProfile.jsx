import { useLocation } from "react-router-dom";
import { PageLayout } from "../components/layout";

const UserProfile = () => {
  const location = useLocation();
  const profile = location.state?.profile;
  return (
    <PageLayout>
      <div className="gap-7 py-14 px-7 flex items-center justify-start">
        <img
          src={profile?.images[1]?.url}
          className="h-[230px] w-[230px] rounded-full"
          alt={profile?.display_name}
        />
        <div className="flex flex-col items-start justify-center gap-5">
        <p className="text-sm text-black dark:text-white font-bold ">
           
          Profile
          </p>
          <p className="text-6xl text-black dark:text-white font-bold ">
           
           {profile?.display_name}
          </p>

          <p className="text-sm mt-4 text-black dark:text-white font-bold ">
           
         17 Public Playlists
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
