import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const baseClasses =
    "px-6 py-2  rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95";

  const variantClasses = {
    primary:
      "bg-green-400 text-white border-2 border-green-400 hover:bg-green-500 shadow-[0_0_5px_2px_rgba(0,255,0,0.8)] hover:shadow-[0_0_10px_4px_rgba(0,255,0,0.9)]",
    secondary:
      "bg-gray-700 text-gray-100 border-2 border-gray-600 hover:bg-gray-600",
    outline:
      "border-2 border-green-400 text-green-400 bg-transparent hover:bg-green-500/10",
  };

  return (
    <button
      type={type}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
