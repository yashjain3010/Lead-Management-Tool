import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./PieChart.css";

function PieChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["In Progress", "Converted", "Not Interested", "New"],
        datasets: [
          {
            data: [
              data.leadlostCount,
              data.leadcontactedCount,
              data.leadqualifiedCount,
              data.leadnewCount,
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(50, 150, 67)",
            ],
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
}

export default PieChart;
