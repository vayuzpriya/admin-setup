import React from "react";

function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-[0_10px_40px_rgba(139,92,246,.45)]",

    secondary:
      "bg-slate-700 text-white hover:bg-slate-600",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-500",

    danger:
      "bg-red-600 text-white hover:bg-red-500",

    warning:
      "bg-yellow-500 text-black hover:bg-yellow-400",

    outline:
      "border border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white",

    ghost:
      "bg-transparent text-white hover:bg-white/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-xl
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;