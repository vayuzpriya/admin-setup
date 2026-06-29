import { useNavigate } from "react-router-dom";

import Button from "../../components/button";

import LineChart from "./charts/LineChart";
import PieChart from "./charts/pieChart";
import Card from "../../components/Card";
function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-10">

     <header className="mb-10 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-8 py-5">

    {/* Left */}
    <div>
        <h1 className="text-3xl font-bold text-white">
            Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
            Analytics Overview
        </p>
    </div>

    {/* Right */}
    <div className="flex items-center gap-5">

        <button className="relative text-white">
            🔔
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <img
            src="https://i.pravatar.cc/100"
            className="h-11 w-11 rounded-full border-2 border-violet-500"
            alt="avatar"
        />

        <Button
            fullWidth={false}
            className="px-6"
            onClick={logout}
        >
            Logout
        </Button>

    </div>

</header>

     <div className="grid gap-8 lg:grid-cols-2">

    <Card
        title="Monthly Revenue"
        subtitle="Revenue generated in the last 7 months"
    >
        <LineChart />
    </Card>

    <Card
        title="Project Status"
        subtitle="Current project distribution"
    >
        <PieChart />
    </Card>

</div>
    </div>
  );
}

export default Dashboard;