import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Footer = () => {
  const footerLinks = [
    {
      id: "01",
      title: "Company",
      links: ["Home", "About Us", "Services", "Our Team"],
    },
    {
      id: "02",
      title: "Policy",
      links: ["Policies", "Contact", "FAQ"],
    },
    {
      id: "03",
      title: "Support",
      links: ["Account", "Support Center", "Feedback", "Accessibility"],
    },
  ];

  return (
    <footer className="text-black">
      <div className="bg-white dark:bg-[#151515] pb-14">
        <div className="border-b border-[#444444] container pt-20 pb-10 mx-auto flex justify-between flex-col lg:flex-row pr-10">
          <div className="w-fit flex flex-col gap-4 sm:flex-row sm:gap-20 justify-start -mb-10 -px-4">
            {footerLinks.map(({ title, links }) => (
              <div className="w-auto px-4" key={uuidv4()}>
                <h2 className="text-black dark:text-white font-bold text-sm mb-3">
                  {title}
                </h2>

                <div className="mb-10 flex flex-col gap-3">
                  {links.map((link) => (
                    <Link
                      key={uuidv4()}
                      to="/"
                      className="text-black dark:text-gray-300 text-sm hover:text-black dark:hover:text-white"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <span className="mt-10 lg:mt-0 flex h-fit px-3 sm:px-6 justify-start sm:justify-center">
            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 rounded-full h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FaFacebookF size={17} />
            </a>
            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 ml-3 rounded-full h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FaTwitter size={17} />
            </a>
            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 ml-3 rounded-full  h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FiInstagram size={17} />
            </a>

            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 ml-3 rounded-full h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FaLinkedinIn size={17} />
            </a>
          </span>
        </div>

        <div className="bg-white dark:bg-[#151515] mb-[80px]">
          <div className="container mx-auto py-4 px-4 flex flex-wrap flex-col sm:flex-row">
            <p className="text-black dark:text-gray-300 text-sm text-center sm:text-left">
              © 2023 Sonify
            </p>

            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-black dark:text-gray-300 text-sm">
              Designed by{" "}
              <a
                href="https://github.com/kishorkrishnak"
                className="text-[#1199e7] ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kishor Krishna ❤️
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
