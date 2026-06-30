import React from "react";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
  required = false,
  error = "",
  success = "",
  helperText = "",
}) {
  const borderStyle = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
    : success
    ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20"
    : "border-slate-700 focus:border-violet-500 focus:ring-violet-500/20";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-xl border
          px-5 py-4
          bg-slate-900
          text-white
          placeholder-slate-500
          outline-none
          transition-all
          duration-300
          focus:ring-4
          ${borderStyle}
          disabled:cursor-not-allowed
          disabled:opacity-50
        `}
      />

      {error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : success ? (
        <p className="text-sm text-emerald-400">{success}</p>
      ) : (
        helperText && (
          <p className="text-sm text-slate-400">{helperText}</p>
        )
      )}
    </div>
  );
}
export default Input;