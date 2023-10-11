import { Sidebar, Header, Bottombar } from "../components";
import TopSongs from "../components/TopSongs";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex flex-col w-[100%] dark:bg-[#11162a] bg-white items-center">
        <Header></Header>
        <Bottombar></Bottombar>
        <TopSongs></TopSongs>
      </div>
    </div>
  );
};

export default Home;
