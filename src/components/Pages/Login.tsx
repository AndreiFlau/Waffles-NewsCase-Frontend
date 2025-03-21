import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Button from "../ui/button";

function Login() {
  const { login, user, message, loading } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.admin) {
      navigate("/dashboard");
    } else if (user) {
      navigate("/user");
    }
  });

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const loginRes = await login(email);
      if (!loginRes) {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      const err = error as Error;
      console.error(`Erro ao logar: ${err} com a mensagem ${message}`);
      setErrorMessage("Erro ao fazer login. Tente novamente.");
      setIsDisabled(false);
    }
  }

  return (
    <section className="self-center justify-self-center mr-auto ml-auto mt-auto mb-auto">
      <h1>Entre com o seu email</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          placeholder="nome@email.com"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <Button type="submit" variant={loading ? "disabled" : "primary"} disabled={isDisabled}>
          Log in
        </Button>
      </form>
      <p>
        Use: admin@thenews.digital para login administrativo. <br /> Ou user1@example.com para login de usuário.
      </p>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </section>
  );
}

export default Login;
