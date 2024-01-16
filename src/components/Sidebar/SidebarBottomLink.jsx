import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";

const SidebarBottomLink = ({ link, pathname }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const handleLinkClick = (e) => {
    e.preventDefault();
    if (link?.loginRequired && !isLoggedIn) return notifyLoginRequired();
    navigate(link.path);
  };
  return (
    <li
      className={`flex grow justify-center items-center gap-5 ${
        pathname === link?.path ? "bg-white" : "bg-[#212121]"
      }  w-fit rounded-lg py-1.5 px-3`}
    >
      {link.icon}
      <a
        onClick={handleLinkClick}
        className={`text-sm  ${
          pathname === link?.path ? "text-black" : "text-white"
        }`}
        href={link.path}
      >
        {link.text}
      </a>
    </li>
  );
};

export default SidebarBottomLink;
