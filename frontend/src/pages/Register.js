import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";
import Notification from "../components/Notification";
import AuthLayout from "../components/auth/AuthLayout";

function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");

    setSuccess("");

    try {
      // Create a new user account and redirect to login after successful registration
      await registerUser(data);

      setSuccess("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Join the dashboard and manage your team projects."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Notification message={error} type="error" />

        <Notification message={success} type="success" />

        <label
          className="
            block
            text-sm
            font-medium
            mb-1
          "
        >
          Name
        </label>

        <input
          placeholder="Enter your name"
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
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <p className="text-red-600 text-sm mb-3">{errors.name.message}</p>
        )}

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
          placeholder="Create a password"
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

              message: "Minimum 6 characters",
            },
          })}
        />

        {errors.password && (
          <p className="text-red-600 text-sm mb-4">{errors.password.message}</p>
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
          Create Account
        </button>

        <p
          className="
            mt-4
            text-center
            text-blue-600
            cursor-pointer
            hover:underline
          "
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;
