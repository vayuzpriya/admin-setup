import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [15, 22, 18, 35, 28, 45, 52],
      borderColor: "#8B5CF6",
      backgroundColor: "rgba(139,92,246,.15)",
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 7,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    title: {
      display: true,
      text: "Monthly Revenue",
      color: "#fff",
      font: {
        size: 20,
      },
    },
  },

  scales: {
    x: {
      ticks: {
        color: "#94A3B8",
      },
      grid: {
        color: "#334155",
      },
    },

    y: {
      ticks: {
        color: "#94A3B8",
      },
      grid: {
        color: "#334155",
      },
    },
  },
};

function LineChart() {
  return (
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;