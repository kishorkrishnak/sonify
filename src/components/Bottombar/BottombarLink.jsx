import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const BottombarLink = ({ link }) => {
  const { pathname } = useLocation();

  return (
    <Link
      key={uuidv4()}
      to={link.path}
      className={`cursor-pointer flex flex-col justify-center items-center gap-0.5 ${
        pathname === link.path ? "text-[#F0EF2A]" : ""
      }`}
    >
      {link.icon}
      {link.text}
    </Link>
  );
};

export default BottombarLink;
