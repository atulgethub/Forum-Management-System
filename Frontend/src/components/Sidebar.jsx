import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  FileText,
  User,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/userDashboard", icon: LayoutDashboard },
    { name: "Home", path: "/", icon: Home },
    { name: "Create Post", path: "/create-post", icon: PlusCircle },
    { name: "My Posts", path: "/my-posts", icon: FileText },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="h-full w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col p-6 shadow-2xl">

      {/* Title */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          User Panel
        </h2>
        <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3">
        {links.map((link) => {
          const Icon = link.icon;

          // Active logic (also highlight My Posts when editing)
          const isActive =
            location.pathname === link.path ||
            location.pathname.startsWith(link.path + "/") ||
            (link.path === "/my-posts" &&
              location.pathname.startsWith("/edit-post"));

          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeSidebar}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-white/10 backdrop-blur-md text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {/* Active Side Indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></span>
              )}

              <Icon
                size={18}
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              <span className="font-medium tracking-wide">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Glow Effect */}
      <div className="mt-auto pt-10">
        <div className="h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
      </div>
    </div>
  );
};

export default Sidebar;