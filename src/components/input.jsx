import React from "react";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm text-slate-300 mb-2">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
      />
    </div>
  );
}

export default Input;