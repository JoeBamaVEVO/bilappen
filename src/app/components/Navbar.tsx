"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Min side", href: "/minside" },
];

export default function Navbar({ session }: { session: any }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links &&
              links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            {session?.user ? (
              <li>
                <p>Logout</p>
              </li>
            ) : (
              <li>
                <Link className="" href="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          🚗💨Bilappen
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links &&
            links.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          {session?.user ? (
            <li>
              <p>Logout</p>
            </li>
          ) : (
            <li>
              <Link className="" href="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
