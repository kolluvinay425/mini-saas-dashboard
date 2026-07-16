import { getUser, logout } from "../../utils/auth";

function DashboardHeader() {
  const user = getUser();

  const handleLogout = () => {
    logout();

    window.location.href = "/";
  };

  return (
    <div
      className="
            flex
            justify-between
            items-center
            mb-8
        "
    >
      <div>
        <h1
          className="
                    text-3xl
                    font-bold
                "
        >
          Mini SaaS Dashboard
        </h1>

        <p
          className="
                    text-gray-600
                    mt-1
                "
        >
          Welcome, {user?.name}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                "
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardHeader;
