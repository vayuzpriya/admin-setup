import React from "react";

function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl

        border border-white/10

        bg-white/5
        backdrop-blur-2xl

        shadow-[0_8px_32px_rgba(0,0,0,0.35)]

        transition-all
        duration-300

        ${
          hover
            ? "hover:border-violet-500/40 hover:shadow-[0_20px_50px_rgba(139,92,246,.25)] hover:-translate-y-1"
            : ""
        }

        ${className}
      `}
    >
      {/* Top Glow */}
      <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

      {/* Bottom Glow */}
      <div className="absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}

export default Card;