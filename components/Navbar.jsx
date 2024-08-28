"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import Link from "next/link";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useSession, signOut } from "next-auth/react";
import { FaArrowRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { DataContext } from "./client/DataContextProvider";
import { CartContext } from "./SessionProVider";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const data = useContext(DataContext);
  const [cartItems] = useContext(CartContext);
  const style = { color: "white" };

  const menuRef = useRef();
  const searchRef = useRef();
  const userCardRef = useRef();

  const searchHandler = async (e) => {
    try {
      const val = e.target.value;
      setSearchQuery(val);
      const res = await fetch(`api/search?query=${val}`);
      const result = await res.json();
      setSearchResults(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (userCardRef.current && !userCardRef.current.contains(event.target)) {
        setIsUserCardOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const signMeOut = () => {
    window.localStorage.clear();
    signOut();
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="fixed top-0 inset-x-0 max-w-full mx-auto z-50 flex items-center justify-between bg-teal-400/90 backdrop-blur-md lg:px-8 py-2">
      <div className="flex items-center sm: pl-4">
        <img
          className="h-10 lg:h-14"
          src="https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/v1/assets/logo.png"
          alt="Logo"
        />
      </div>
      <div className="hidden md:flex">
        <Menu setActive={setActive}>
          <Link href="/">
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="flex flex-col space-y-3 text-md">
              <>
                {data.map((d, i) => (
                  <HoveredLink key={i} href={`/category/${d._id}`}>
                    {d.name}
                  </HoveredLink>
                ))}
                <div className="flex items-center space-y-1">
                  <HoveredLink href="/category">
                    <div className=" text-md pr-2 text-teal-400">Load More</div>
                  </HoveredLink>
                  <div>
                    <FaArrowRight style={{ color: "#4DB6AC" }} size={14} />
                  </div>
                </div>
              </>
            </div>
          </MenuItem>
          <Link href="/about-us">
            <MenuItem setActive={setActive} active={active} item="About Us" />
          </Link>
          <Link href="/blog">
            <MenuItem setActive={setActive} active={active} item="Blog" />
          </Link>
          <Link href="/contact-us">
            <MenuItem setActive={setActive} active={active} item="Contact Us" />
          </Link>
        </Menu>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <CiSearch style={style} size={30} />
        </button>
        <Link className="relative flex" href="/cart">
          <CiShoppingCart style={style} size={30} />
          {cartItems > 0 && (
            <span className="absolute flex items-center justify-center  right-0 top-0 rounded-full w-[60%] h-[60%] bg-red-500 text-white  text-xs ">
              {cartItems}
            </span>
          )}
        </Link>
        <div className="hidden md:block" ref={userCardRef}>
          {session && session.user ? (
            <div
              className="block lg:mt-0 lg:inline-block text-white font-semibold hover:underline mr-4"
              onClick={() => setIsUserCardOpen(!isUserCardOpen)}
            >
              {session.user?.image ? (
                <img
                  src={String(session?.user?.image)}
                  alt="Profile Photo"
                  className="w-9 h-9 rounded-full mr-2 inline-block"
                />
              ) : (
                <CgProfile size={30} />
              )}
            </div>
          ) : (
            <Link href="/login">
              <CiUser
                className="hover:invert-1"
                style={style}
                filter="invert(0)"
                size={30}
              />
            </Link>
          )}
          {isUserCardOpen && (
            <div className="absolute top-14 right-0 w-50 bg-white shadow-lg rounded-lg p-4 z-50">
              <p className="font-semibold">{session.user.name}</p>
              <p className="text-sm text-gray-600">{session.user.email}</p>
              {session.provider === "credentials" && (
                <p className="text-md text-gray-600">
                  <Link href="/profile-detail">
                    <button className="mt-2 w-full bg-teal-500 focus-visible:bg-teal-600 text-white py-1 px-2 rounded">
                      Profile
                    </button>
                  </Link>
                </p>
              )}
              <button
                onClick={signMeOut}
                className="mt-2 w-full bg-teal-500 focus-visible:bg-teal-600 text-white py-1 px-2 rounded"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex md:hidden items-center space-x-4 pr-4">
        <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <CiSearch style={style} size={30} />
        </button>
        <Link className="relative flex" href="/cart">
          <CiShoppingCart style={style} size={30} />
          {cartItems > 0 && (
            <span className="absolute flex items-center justify-center  right-0 top-0 rounded-full w-[60%] h-[60%] bg-red-500 text-white  text-xs ">
              {cartItems}
            </span>
          )}
        </Link>
        <GiHamburgerMenu
          style={{ color: "white" }}
          size={24}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-14 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/v1/assets/logo.png"
                  alt="Logo"
                />
              </div>
              <div className="-mr-2">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                About Us
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Contact Us
              </Link>
              <Link
                href="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Cart
              </Link>
              {session && session.user ? (
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  <Link href="/profile-detail">{session.user.name}</Link>
                  <button
                    onClick={signMeOut}
                    className="mt-2 w-full bg-teal-500 focus-visible:bg-teal-600 text-white py-1 px-2 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Login
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
