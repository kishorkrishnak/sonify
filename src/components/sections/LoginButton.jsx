const LoginButton = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_API_URL;
  return (
    <a
      href={`${backendUrl}/auth/login`}
      className="bg-[#3C3E4D] text-white w-fit px-3 py-1 rounded-md"
    >
      {" "}
      Login
    </a>
  );
};

export default LoginButton;
