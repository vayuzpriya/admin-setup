import React from "react";

function Card({
  children,
  className = "",
  hover = true,
  variant = "glass",
  padding = "md",
}) {
  const variants = {
    glass:
      "bg-white/5 border border-white/10 backdrop-blur-2xl",

    solid:
      "bg-slate-900 border border-slate-800",

    outline:
      "bg-transparent border border-slate-700",

    gradient:
      "bg-gradient-to-br from-violet-900/40 via-slate-900 to-cyan-900/30 border border-violet-500/20",
  };

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl

        shadow-[0_8px_32px_rgba(0,0,0,.35)]
        transition-all
        duration-300

        ${variants[variant]}
        ${hover ? "hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(139,92,246,.25)] hover:border-violet-500/40" : ""}
        ${className}
      `}
    >
      <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className={`relative z-10 ${paddings[padding]}`}>
        {children}
      </div>
    </div>
  );
}

export default Card;