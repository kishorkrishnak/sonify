import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <Link
      onClick={() => localStorage.removeItem("token")}
      className="cursor-pointer bg-yellow-400 hover:bg-yellow-600 w-fit px-3 py-1 rounded-md"
    >
      {" "}
      Logout
    </Link>
  );
};

export default Logout;
