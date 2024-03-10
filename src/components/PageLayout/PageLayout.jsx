import Bottombar from "../Bottombar/Bottombar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const PageLayout = ({ children }) => {
  return (
    <div className="flex gap-[3px] relative">
      <Sidebar></Sidebar>
      <div className="rounded-lg relative flex flex-col w-[100%] dark:bg-[#151515] bg-white min-h-[100vh]">
        <Header></Header>
        {children}
        <Bottombar></Bottombar>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PageLayout;
