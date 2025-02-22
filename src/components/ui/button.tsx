import { PropsWithChildren, ButtonHTMLAttributes } from "react";

function Button({
  children,
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & { variant?: "primary" | "disabled" }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "bg-[#FFCE04] text-black hover:bg-yellow-500 focus-visible:ring-yellow-300 h-10 px-4 text-base cursor-pointer",
    disabled:
      "bg-[#FFCE04] text-black hover:bg-yellow-500 focus-visible:ring-yellow-300 h-10 px-4 text-base cursor-not-allowed opacity-50",
  };

  return (
    <button className={`${baseStyles}  ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
