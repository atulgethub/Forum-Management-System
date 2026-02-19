import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="space-y-6">

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Categories</h2>
        <ul className="space-y-2">
          <li><Link to="/general" className="block hover:text-blue-600 transition">General</Link></li>
          <li><Link to="/javascript" className="block hover:text-blue-600 transition">Javascript</Link></li>
          <li><Link to="/react" className="block hover:text-blue-600 transition">React</Link></li>
          <li><Link to="/nodejs" className="block hover:text-blue-600 transition">Node JS</Link></li>
          <li><Link to="/tailwind" className="block hover:text-blue-600 transition">Tailwind</Link></li>
        </ul>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Popular Topics</h2>
        <ol className="space-y-2 list-decimal list-inside text-gray-700">
          <li><Link to="/topic1" className="hover:text-blue-600 transition">Topic 1</Link></li>
          <li><Link to="/topic2" className="hover:text-blue-600 transition">Topic 2</Link></li>
          <li><Link to="/topic3" className="hover:text-blue-600 transition">Topic 3</Link></li>
        </ol>
      </div>

    </div>
  );
};

export default Sidebar;
