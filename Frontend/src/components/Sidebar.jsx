import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/userDashboard" },
    { name: "Home", path: "/" },
    { name: "Create Post", path: "/create-post" },
    { name: "My Posts", path: "/my-posts" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col p-6">

      <h2 className="text-2xl font-bold mb-8 tracking-wide">
        User Panel
      </h2>

      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const isActive =
            location.pathname === link.path ||
            location.pathname.startsWith(link.path + "/");

          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeSidebar}
              className={`px-4 py-3 rounded-lg transition duration-200 ${
                isActive
                  ? "bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

    </div>
  );
};

export default Sidebar;