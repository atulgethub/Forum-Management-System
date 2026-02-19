import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen top-0 p-5 space-y-6 bg-gray-50 fixed mt-20">
      
      {/* Categories */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Categories</h2>
        <ul className="space-y-2">
          <li><Link to="/category/general" className="block hover:text-blue-600 transition">General</Link></li>
          <li><Link to="/category/javascript" className="block hover:text-blue-600 transition">Javascript</Link></li>
          <li><Link to="/category/react" className="block hover:text-blue-600 transition">React</Link></li>
          <li><Link to="/category/nodejs" className="block hover:text-blue-600 transition">Node JS</Link></li>
          <li><Link to="/category/tailwind" className="block hover:text-blue-600 transition">Tailwind</Link></li>
        </ul>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Popular Topics</h2>
        <ol className="space-y-2 list-decimal list-inside text-gray-700">
          <li><Link to="/topic/topic1" className="hover:text-blue-600 transition">Topic 1</Link></li>
          <li><Link to="/topic/topic2" className="hover:text-blue-600 transition">Topic 2</Link></li>
          <li><Link to="/topic/topic3" className="hover:text-blue-600 transition">Topic 3</Link></li>
        </ol>
      </div>

    </aside>
  );
};

export default Sidebar;
