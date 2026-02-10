import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SingnUp from "./Pages/SingnUp";

const App = () => {
  const location = useLocation();

  // hide layout on login page
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="h-screen w-screen">
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SingnUp />} />

      

        {/* Main layout routes */}
        <Route
          path="/*"
          element={
            !hideLayout && (
              <div className="flex h-[90vh] p-6 gap-6">
                <div className="w-[22%] border shadow rounded p-4">
                  <Sidebar />
                </div>
                <div className="flex-1 border shadow rounded p-4">
                  <Home />
                </div>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
