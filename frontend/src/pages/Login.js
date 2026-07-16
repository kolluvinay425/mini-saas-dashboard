import { useState } from "react";
import { loginUser } from "../api/authApi";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/";
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-100
        "
    >
      <form
        onSubmit={handleLogin}
        className="
                    bg-white
                    p-8
                    rounded-lg
                    shadow
                    w-full
                    max-w-md
                "
      >
        <h1
          className="
                    text-2xl
                    font-bold
                    mb-6
                "
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
                        w-full
                        border
                        p-2
                        rounded
                        mb-4
                    "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
                        w-full
                        border
                        p-2
                        rounded
                        mb-6
                    "
        />

        <button
          className="
                        w-full
                        bg-blue-600
                        text-white
                        py-2
                        rounded
                    "
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
