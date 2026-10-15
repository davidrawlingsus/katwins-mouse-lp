import Image from "next/image";

type BenefitPillProps = {
  text: string;
  variant?: "green" | "lavender" | "white";
  className?: string;
  textSize?: string;
  wrap?: boolean;
  size?: "default" | "sm";
};

export default function BenefitPill({
  text,
  variant = "green",
  className = "",
  textSize,
  wrap = false,
  size = "default",
}: BenefitPillProps) {
  const background = variant === "green" ? "bg-[#D5E0C9]" : variant === "lavender" ? "bg-[#E8F0F6]" : "bg-[#E8F0F6] shadow-lg";
  const shadow = variant === "lavender" ? "" : variant === "white" ? "shadow-lg" : "";
  const spacing = size === "sm" ? "px-2 md:px-3 py-1 md:py-1.5 gap-1 md:gap-2" : "px-3 md:px-4 py-1 md:py-1.5 gap-1 md:gap-2";
  const defaultTextSize = size === "sm" ? "text-[13px] md:text-[16px] lg:text-[18px] leading-[1.2]" : "pill-text";

  return (
    <div
      className={`${background} ${shadow} ${spacing} rounded-full inline-flex items-center ${className}`}
      style={variant === "lavender" ? { opacity: 0.95 } : {}}
    >
      <Image
        src="/lps/General_Page_Assets/checkmark.png"
        alt="Checkmark"
        width={16}
        height={16}
        className={`${size === "sm" ? "w-3.5 h-3.5 md:w-5 md:h-5" : "md:w-5 md:h-5"} flex-shrink-0`}
      />
      <span
        className={`font-greed font-bold text-[#231f20] ${textSize || defaultTextSize} ${wrap ? "whitespace-normal text-left" : "whitespace-nowrap"}`}
      >
        {text}
      </span>
    </div>
  );
}
