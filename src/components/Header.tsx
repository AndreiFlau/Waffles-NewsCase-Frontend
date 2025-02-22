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
      <div className="flex items-center">
        <div className="text-black-500">
          <h1>☕ News</h1>
        </div>
        {user && (
          <div className="ml-auto gap-3 flex">
            <Button onClick={logoutFunc}>Log out</Button>
            <Button onClick={handleClick}>{user.admin && !clicked ? "User" : "Dashboard"}</Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
