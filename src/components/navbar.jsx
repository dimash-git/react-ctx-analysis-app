import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import apiClient from "../utils/apiClient";
import DropdownMenu from "./dropdown-menu";

const menuStyles = {
  width: 200,
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  const { user } = useAuth();

  return (
    <header>
      <div className="navbar">
        <div className="navbar-logo-wrapper">
          <img
            src={Logo}
            className="navbar-logo"
            width={48}
            height={48}
            alt="Logo"
          />
          <span>React + FastApi App</span>
        </div>
        {user?.name && (
          <DropdownMenu triggerContent={user.name} menuStyles={menuStyles}>
            <div className="dropdown-item" onClick={handleLogout}>
              Выход
            </div>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Navbar;
