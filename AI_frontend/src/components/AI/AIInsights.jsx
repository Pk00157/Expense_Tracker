// import { useEffect, useState } from "react";

// function AIInsights({ expenses }) {
    //   const [insight, setInsight] = useState([]);
    //   const [loading, setLoading] = useState(false);

    //   const generateInsights = async () => {
    //     if (expenses.length === 0) return;

    //     // Convert expenses → text
    //     const expenseText = expenses
    //       .map(e => `${e.description} ₹${e.amount} (${e.category})`)
    //       .join("\n");

    //     try {
    //       setLoading(true);

    //       const response = await fetch("http://localhost:18080/insights", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ data: expenseText })
    //       });

    //       const data = await response.json();

    //       setInsight(data.insights);

    //     } catch (error) {
    //       console.error("Insight error:", error);
    //       setInsight(["AI insights unavailable"]);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   useEffect(() => {
    //     generateInsights();
    //   }, [expenses]);

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 mt-10">
//       <h2 className="text-xl font-semibold mb-4">
//         AI Financial Insights
//       </h2>

//       {loading ? (
//         <p className="text-gray-500">Analyzing your spending...</p>
//       ) : (
//         <ul className="list-disc pl-5 text-gray-700">
//           {insight.map((i, index) => (
//             <li key={index}>{i}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AIInsights;
import { useEffect, useState } from "react";
import { Brain, Sparkles } from "lucide-react";

function AIInsights({ expenses }) {
  const [insight, setInsight] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    if (expenses.length === 0) return;

    // Convert expenses → text
    const expenseText = expenses
      .map(e => `${e.description} ₹${e.amount} (${e.category})`)
      .join("\n");

    try {
      setLoading(true);

      const response = await fetch("http://localhost:18080/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: expenseText })
      });

      const data = await response.json();

      setInsight(data.insights);

    } catch (error) {
      console.error("Insight error:", error);
      setInsight(["AI insights unavailable"]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateInsights();
  }, [expenses]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-10 border border-gray-100">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Brain className="text-indigo-600" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            AI Financial Insights
          </h2>
          <p className="text-sm text-gray-500">
            Smart analysis of your spending patterns
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Sparkles className="animate-pulse" size={18} />
          <span>Analyzing your spending...</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && insight.length === 0 && (
        <p className="text-gray-400 text-sm">
          Add some expenses to generate AI insights.
        </p>
      )}

      {/* Insights */}
      {!loading && insight.length > 0 && (
        <div className="flex flex-col gap-3">
          {insight.map((i, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <Sparkles className="text-indigo-500 mt-1" size={18} />
              <p className="text-gray-700 text-sm leading-relaxed">
                {i}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AIInsights;