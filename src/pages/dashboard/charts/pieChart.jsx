import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Completed",
    "Pending",
    "In Progress",
    "Cancelled",
  ],
  datasets: [
    {
      label: "Projects",
      data: [45, 20, 25, 10],

      backgroundColor: [
        "#8B5CF6",
        "#06B6D4",
        "#F59E0B",
        "#EF4444",
      ],

      borderColor: "#0F172A",
      borderWidth: 3,

      hoverOffset: 15,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",

      labels: {
        color: "#CBD5E1",
        padding: 20,
        font: {
          size: 14,
        },
      },
    },

    title: {
      display: true,
      text: "Project Status",
      color: "#fff",
      font: {
        size: 20,
      },
    },
  },
};

function PieChart() {
  return (
    <div className="h-96">
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;