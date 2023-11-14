import Bottombar from "./Bottombar";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PageLayout = ({ children}) => {
  return (
    <div className="flex">
      <Sidebar ></Sidebar>
      <div className="relative flex flex-col w-[100%] dark:bg-[#11162a] bg-white min-h-[100vh]">
        <Header></Header>
        {children}
        <Bottombar></Bottombar>
      </div>
    </div>
  );
};

export default PageLayout;
