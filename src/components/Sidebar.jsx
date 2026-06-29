import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdInput,
  MdViewModule,
  MdTextFields,
  MdAutorenew,
} from "react-icons/md";

import { FaRegSquare } from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard size={20} />,
    },
    {
      title: "Input",
      path: "/dashboard/input",
      icon: <MdInput size={20} />,
    },
    {
      title: "Button",
      path: "/dashboard/button",
      icon: <FaRegSquare size={18} />,
    },
    {
      title: "Card",
      path: "/dashboard/card",
      icon: <MdViewModule size={20} />,
    },
    {
      title: "Loader",
      path: "/dashboard/loader",
      icon: <MdAutorenew size={20} />,
    },
    {
      title: "Typography",
      path: "/dashboard/text",
      icon: <MdTextFields size={20} />,
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}
      <div className="border-b border-slate-800 p-8">
        <h1 className="text-2xl font-bold text-white">
          UI Components
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          React + Tailwind Library
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4">

        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Components
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}

              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">
        <p className="text-center text-xs text-slate-500">
          Version 1.0.0
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;