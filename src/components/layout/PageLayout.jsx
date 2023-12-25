import Bottombar from "./Bottombar";
import Footer from "./Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";

const PageLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="relative flex flex-col w-[100%] dark:bg-[#151515] bg-white min-h-[100vh]">
        <Header></Header>
        {children}
        <Bottombar></Bottombar>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PageLayout;
