import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  Icon?: React.ElementType;
};

export default function Input({
  type = "text",
  placeholder = "",
  Icon,
  ...rest
}: InputProps) {
  return (
    <div className="relative">
      {Icon && (
        <button type="submit">
          <Icon
            className={`absolute text-white left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 `}
          />
        </button>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full min-w-[30vw] ${
          Icon && "pl-10"
        } pr-4 py-3 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
        {...rest}
      />
    </div>
  );
}
