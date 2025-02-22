import { useNavigate } from "react-router";
import useAuth from "./hooks/useAuth";
import Button from "./ui/button";
import { useState } from "react";

function Header() {
  const { logout, user } = useAuth();
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  async function logoutFunc() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick() {
    setClicked(!clicked);
    if (user?.admin && !clicked) {
      navigate("/user");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <header>
      <div className="text-yellow-200">
        <h1>Logo</h1>
      </div>
      {user && (
        <div>
          <Button onClick={logoutFunc}>Log out</Button>
          <Button onClick={handleClick}>{user.admin && !clicked ? "User" : "Dashboard"}</Button>
        </div>
      )}
    </header>
  );
}

export default Header;
