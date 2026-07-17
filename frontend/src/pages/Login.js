import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useState } from "react";

import Notification from "../components/Notification";
import AuthLayout from "../components/auth/AuthLayout";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");

    try {
      const response = await loginUser(data);

      // Authenticate user and store JWT token with user data in auth context
      login(response.user, response.token);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue to your dashboard."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Notification message={error} type="error" />

        <label
          className="
            block
            text-sm
            font-medium
            mb-1
          "
        >
          Email address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="
            w-full
            border
            p-2
            rounded-lg
            mb-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          {...register("email", {
            required: "Email is required",

            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

              message: "Enter a valid email",
            },
          })}
        />

        {errors.email && (
          <p className="text-red-600 text-sm mb-3">{errors.email.message}</p>
        )}

        <label
          className="
            block
            text-sm
            font-medium
            mb-1
          "
        >
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="
            w-full
            border
            p-2
            rounded-lg
            mb-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          {...register("password", {
            required: "Password is required",

            minLength: {
              value: 6,

              message: "Password must be at least 6 characters",
            },
          })}
        />

        {errors.password && (
          <p className="text-red-600 text-sm mb-3">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-2
            rounded-lg
            transition
          "
        >
          Login
        </button>

        <p
          className="
            mt-4
            text-center
            text-blue-600
            cursor-pointer
            hover:underline
          "
          onClick={() => navigate("/register")}
        >
          Don't have an account? Create account
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
