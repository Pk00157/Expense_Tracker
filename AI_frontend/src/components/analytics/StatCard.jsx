function StatCard({ title, value, color = "blue" }) {

  const colors = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    red: "border-red-500"
  };

  return (
    <div className={`bg-white shadow-md rounded-xl p-6 w-full border-l-4 ${colors[color]} hover:shadow-lg transition`}>

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2 text-gray-800">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;