import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/navbar-component";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/home");
    }
  }, [navigate, pathname]);
  return (
    <div className="md:p-10 p-5">
      <NavBar />
      <div className="my-10 dark:bg-[#363432]">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
