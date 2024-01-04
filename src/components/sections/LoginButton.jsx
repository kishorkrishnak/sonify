const LoginButton = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_API_URL;
  return (
    <a
      href={`${backendUrl}/auth/login`}
      className="bg-[#251F1F] text-white w-fit px-3 py-1 rounded-md"
    >
      {" "}
      Login
    </a>
  );
};

export default LoginButton;
