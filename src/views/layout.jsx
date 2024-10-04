import { useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CarbonFavorite } from "../assets/Icons";
import { Button } from "@nextui-org/react";
// import ThemeToggle from 'tailwind-easy-theme-switcher';
import DarkModeToggle from "../components/DarkMode";
import baseURL from "../lib-axios/baseUrl";

// Header menu item
const headerClasses =
  "border border-gray-100 rounded-lg lg:flex-row lg:space-x-8 lg:border-0 lg:";
const containerClasses = "flex flex-col p-0 lg:p-0 mt-4 lg:mt-0";

function HeaderItem({ link, text }) {
  return (
    <Link
      to={link}
      // className="font-medium px-4 py-4 lg:pt-4 hover:rounded-lg hover:bg-slate-300 dark:hover:bg-blue-800"
    >
      <Button
        radius="sm"
        variant="light"
        className="py-6 text-slate-200 dark:text-slate-100"
      >
        <span className="text-slate-900 dark:text-slate-100 font-black">
          {text}
        </span>
      </Button>
    </Link>
  );
}
HeaderItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

// Sidebar menu item (if any)
function SidebarMenuItem({ href, icon, text }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
      >
        {icon}
        <span className="ms-3">{text}</span>
      </a>
    </li>
  );
}
SidebarMenuItem.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

function Logo() {
  return (
    <Link to="/" className="flex justify-center items-center lg:mx-8">
      <img
        src="https://w7.pngwing.com/pngs/117/903/png-transparent-computer-icons-bidding-auction-business-service-bid-angle-trademark-service-thumbnail.png"
        className="h-8 rounded-full pr-4"
        alt="Logo"
      />
      <span className="self-center text-4xl font-extrabold whitespace-nowrap ">
        ABIDIN
      </span>
      <div className="mx-2 border-l-2 border-gray-400 h-10 hidden md:block"></div>
      <p className="text-sm  hidden md:block">
        Auction and Bid <br></br> Indonesia
      </p>
    </Link>
  );
}

function Layout() {
  //states
  // Control the menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Check if current is in homepage
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  //variables
  const logged = localStorage.getItem("logged");

  const navigate = useNavigate();
  console.log("logged", logged);

  const handleLogout = async () => {
    const response = await axios.get(`${baseURL}/logged`);
    const id = response.data[0].id;
    try {
      const response = await axios.delete(`${baseURL}/logged/${id}`);
      console.log("response", response);
      localStorage.removeItem("logged");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header first layer */}
      <header className=" border-gray-300 dark:border-gray-900">
        <div className="max-w-screen-xl flex flex-wrap align-middle items-center justify-between p-4">
          {/* Logo */}
          <Logo />

          <div className="flex flex-wrap align-middle items-center justify-between">
            {/* Toggle button */}
            <DarkModeToggle />
            {/* sm header toggle button */}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div></div>
      </header>
      {/* Header second layer */}
      <header className=" border-gray-300 dark:border-slate-800 border-b-1">
        <div
          className={`flex-wrap items-center justify-between w-full  lg:mx-8 lg:flex lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          {/* Left group */}
          <div className={`flex flex-col ${headerClasses}`}>
            {/* <HeaderItem link="/addproduct" text="SELL" /> */}
            <HeaderItem link="/sellpage" text="SELL" />

            <HeaderItem link="/list" text="BID/BUY" />
            <HeaderItem link="/categories" text="CATEGORIES" />
            <HeaderItem link="/about" text="ABOUT" />
          </div>
          {/* Right group */}
          <div className={`font-medium ${containerClasses} ${headerClasses}`}>
            {/* conditional component: islogged? */}
            {logged ? undefined : (
              <HeaderItem link="/register" text="REGISTER" />
            )}
            {logged ? (
              <div className="flex gap-5">
                <div className="flex items-center cursor-pointer">
                  <CarbonFavorite
                    className="hover:bg-red-600 rounded-xl text-3xl "
                    onClick={() => navigate("/watchlist")}
                  />
                </div>
                <HeaderItem link="/dashboard" text="PROFILE" />
                <div className="cursor-pointer">
                  <Button
                    radius="sm"
                    variant="light"
                    className="py-6 text-slate-200 dark:text-slate-100"
                    onClick={() => handleLogout()}
                  >
                    <a className="text-slate-900 dark:text-slate-100 font-black">
                      LOGOUT
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <HeaderItem link="/login" text="LOGIN" />
            )}

            <div className=""></div>
          </div>
        </div>
      </header>

      {/* Centre content */}
      {/* <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] via-red-100 to-yellow-100 "></div> */}
      <div className="flex-1 bg-gradient-to-r from-transparent flex flex-col sm:flex-row h-screen">
        {/* Main content */}
        {/* if it's homepage, no pad nor margin is applied */}
        <main
          className={`flex-1 overflow-y-auto ${
            isHomepage ? "p-0" : "px-12 py-4"
          }`}
        >
          <Outlet />
        </main>
      </div>

      <footer className=" w-fullshadow z-50">
        <hr className=" border-gray-200 dark:border-slate-600 sm:mx-auto 0 my-2 mt-10" />
        <span className="mt-8 block text-sm mb-4 sm:text-center ">
          © 2024. All Engine Ahead Flank.
        </span>
      </footer>
    </div>
  );
}

export default Layout;
