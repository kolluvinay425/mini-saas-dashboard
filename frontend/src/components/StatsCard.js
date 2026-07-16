function StatsCard({ title, value, icon }) {
  return (
    <div
      className="
                bg-white
                rounded-lg
                shadow
                p-5
            "
    >
      <div
        className="
                flex
                items-center
                justify-between
            "
      >
        <div>
          <p
            className="
                        text-gray-500
                        text-sm
                    "
          >
            {title}
          </p>

          <h2
            className="
                        text-3xl
                        font-bold
                        mt-2
                    "
          >
            {value}
          </h2>
        </div>

        <div
          className="
                    text-3xl
                    text-blue-600
                "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
