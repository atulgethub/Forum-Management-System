import { Link } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-full w-full space-y-6">

      {/* Categories Box */}
      <div className="border w-full p-4 shadow-md rounded bg-white">
        <h1 className="font-bold text-xl mb-2">Categories</h1>
        <hr />

        <ul className="flex flex-col gap-y-2 mt-4">
            <li><Link to="/general">General</Link></li>
            <li><Link to="/javscript">Javascript</Link></li>
            <li><Link to="/react">React</Link></li>
            <li><Link to="/nodejs">Node js</Link></li>
            <li><Link to="/tailwind">Tailwind</Link></li>
        </ul>
      </div>

      {/* Second Box */}
      <div className="border w-full p-4 shadow-md rounded bg-white">

        <h1 className="font-bold text-xl mb-2">Popular Topics</h1>
        <hr />

        <ol className="flex flex-col gap-y-2 mt-4">
            <li><Link to="/topic1">Topic 1</Link></li>
            <li><Link to="/topic2">Topic 2</Link></li>
            <li><Link to="/topic3">Topic 3</Link></li>
        </ol>
        
      </div>

    </div>
  );
};

export default Sidebar;
