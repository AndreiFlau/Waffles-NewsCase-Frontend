import { useLocation, useNavigate } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import useAuth from "./hooks/useAuth";
import Main from "./Main";
import Button from "./ui/button";
import { useEffect } from "react";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const hideInRoutes = ["/dashboard", "/user"];
  const shouldShowDiv = !hideInRoutes.includes(location.pathname);

  function handleClick() {
    if (user?.admin) {
      navigate("/dashboard");
    } else {
      navigate("/user");
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col">
      <Header />
      <Main />
      {shouldShowDiv &&
        user &&
        (user?.admin ? (
          <div className="text-center">
            <h1 className="mb-4">Vamos lá!</h1>
            <Button onClick={handleClick}>Entre no dashboard</Button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="mb-4">Vamos lá!</h1>
            <Button onClick={handleClick}>Entre no seu perfil</Button>
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default App;
