import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { menus } from "../../menus";
import Logout from "./Logout";
import logo from "../../assets/resource.png"
export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const email = sessionStorage.getItem("email");
  const displayName = email ? email.split("@")[0] : "User";
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#F8922C] shadow flex items-center justify-between px-4 z-50 bgc">
        <div className="flex items-center gap-4">
          {/* Logo */}

          <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
         <h1 className="text-xl font-bold text-white">MyLibrary</h1>
          {/* Hamburger */}
          <button
            className="p-2 rounded hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          
        </div>
        <div>
          <h2 className="text-lg text-white font-bold hidden md:block">Book Rental System Management Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
       <span className="text-white font-medium hidden sm:block">
          Welcome {displayName}!
      </span>
      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
    {displayName.charAt(0).toUpperCase()}
   </div>
  <Logout />
 </div>
</header>
  {/* Body: sidebar + routed page content */}
  <div className="flex flex-1 pt-16 ">
        {/* Sidebar */}
        <aside
          className={`bg-[#E7DDDE] shadow transition-all duration-300 overflow-auto h-screen ${
            sidebarOpen ? "w-64" : "w-16"
          }`}
        >
          <ul className="flex flex-col mt-4 gap-2">
            {menus.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {sidebarOpen && item.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        
      </div>
      {/* Footer */}
      <footer className="h-16 bg-gray-200 text-gray-700 flex items-center justify-center shadow-inner">
        &copy; {new Date().getFullYear()} MyLibrary. All rights reserved.
      </footer>

    </div>
  );
}
