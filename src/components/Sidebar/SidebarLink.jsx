import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SidebarLink = ({ link, pathname, colorTheme }) => {
  return (
    <li key={uuidv4()} className="flex justify-start items-center gap-5">
      {link.icon}
      <Link
        className={`text-sm font-bold ${
          pathname === link.path && colorTheme !== "light" ? "text-white" : ""
        }`}
        to={link.path}
      >
        {link.text}
      </Link>
    </li>
  );
};

export default SidebarLink;
