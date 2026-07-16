function AuthLayout({ title, description, children }) {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-4
      "
    >
      <div
        className="
          bg-white
          p-8
          rounded-lg
          shadow
          w-full
          max-w-md
        "
      >
        {/* Brand */}
        <div className="text-center mb-6">
          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >
            Mini SaaS Dashboard
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Manage your projects, teams and budgets in one place.
          </p>
        </div>

        <h2
          className="
            text-xl
            font-semibold
            mb-2
          "
        >
          {title}
        </h2>

        <p
          className="
            text-gray-500
            mb-6
          "
        >
          {description}
        </p>

        {children}

        <p
          className="
            text-center
            text-gray-400
            text-sm
            mt-6
          "
        >
          © 2026 Mini SaaS Dashboard
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
