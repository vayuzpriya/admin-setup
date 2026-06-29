import React from "react";

const variants = {
  h1: "text-5xl font-bold text-white",
  h2: "text-4xl font-bold text-white",
  h3: "text-3xl font-semibold text-white",
  h4: "text-2xl font-semibold text-white",

  body: "text-base text-slate-300",

  bodyLg: "text-lg text-slate-300",

  small: "text-sm text-slate-400",

  caption: "text-xs uppercase tracking-widest text-slate-500",

  success: "text-base font-medium text-green-400",

  error: "text-base font-medium text-red-400",

  warning: "text-base font-medium text-yellow-400",

  info: "text-base font-medium text-cyan-400",

  primary: "text-base font-medium text-violet-400",
};

function Typography({
  children,
  variant = "body",
  className = "",
}) {
  const Tag =
    variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : variant === "h4"
      ? "h4"
      : "p";

  return (
    <Tag
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export default Typography;