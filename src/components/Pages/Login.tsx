import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

function Login() {
  const { login, user, message } = useAuth();
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
    try {
      await login(email);
    } catch (error) {
      const err = error as Error;
      console.error(`Erro ao logar: ${err} com a mensagem ${message}`);
      setErrorMessage("Erro ao fazer login. Tente novamente.");
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="nome@email.com"
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
      </form>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </section>
  );
}

export default Login;
