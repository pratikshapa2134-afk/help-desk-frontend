import React from "react";

const Statistics = () => {
  const stats = [
    { id: 1, title: "Total Users", value: "1,250", change: "+12%" },
    { id: 2, title: "Total Messages", value: "8,430", change: "+8%" },
    { id: 3, title: "Active Now", value: "342", change: "+5%" },
    { id: 4, title: "Blocked", value: "12", change: "-2%" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
            <p className="text-green-600 text-sm mt-1">{stat.change} from last week</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statistics;