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
        <div className="text-black-500 bg-[#FFCE04] rounded-2xl p-4">
          <h1>☕ The News</h1>
        </div>
        {user && (
          <div className="ml-auto gap-3 flex items-center">
            <h3>{user.email}</h3>
            <Button onClick={logoutFunc}>Log out</Button>
            <Button onClick={handleClick}>{user.admin && !clicked ? "User" : "Dashboard"}</Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
