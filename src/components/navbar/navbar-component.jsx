import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi2";
import CartIcon from "../cartIcon/cartIcon-component";
import FavIcon from "../fav-icon/fav-icon-component";
import ThemeToggle from "../theme-toggle/theme-toggle-component";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-nowrap justify-between">
      <div>
        {pathname === "/home" ? (
          <button className="btn btn-link text-lg btn-disabled">Home</button>
        ) : (
          <button
            className="btn btn-link text-lg"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Link to="cart">
          <CartIcon />
        </Link>
        <Link to="favorites">
          <FavIcon />
        </Link>
        <div className="justify-self-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
