import useAuth from "./hooks/useAuth";
import Button from "./ui/button";

function Header() {
  const { logout, user } = useAuth();

  async function logoutFunc() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
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
        </div>
      )}
    </header>
  );
}

export default Header;
