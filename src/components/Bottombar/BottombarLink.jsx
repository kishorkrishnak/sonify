import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";

const BottombarLink = ({ link }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const handleLinkClick = (e) => {
    e.preventDefault();
    if (link.loginRequired && !isLoggedIn) return notifyLoginRequired();
    navigate(link.path);
  };
  return (
    <a
      key={uuidv4()}
      href={link.path}
      onClick={handleLinkClick}
      className={`cursor-pointer flex flex-col justify-center items-center gap-0.5 ${
        pathname === link.path ? "text-[#F0EF2A]" : ""
      }`}
    >
      {link.icon}
      {link.text}
    </a>
  );
};

export default BottombarLink;
