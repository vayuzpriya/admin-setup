import React from "react";

function Loader({
  size = "md",
  color = "violet",
}) {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-[5px]",
  };

  const colors = {
    violet: "border-violet-500",
    cyan: "border-cyan-500",
    green: "border-green-500",
    red: "border-red-500",
    white: "border-white",
  };

  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-t-transparent
        ${sizes[size]}
        ${colors[color]}
      `}
    />
  );
}

export default Loader;