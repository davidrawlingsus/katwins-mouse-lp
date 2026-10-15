const VARIANTS = {
  black: { bg: "bg-[#231f20]", text: "text-white" },
  chartreuse: { bg: "bg-[#d5e709]", text: "text-[#231f20]" },
};

type SectionTagProps = {
  children: React.ReactNode;
  className?: string;
  rotate?: boolean;
  variant?: keyof typeof VARIANTS;
};

export default function SectionTag({ children, className = "", rotate = true, variant = "black" }: SectionTagProps) {
  const colours = VARIANTS[variant];
  return (
    <div className={`inline-flex ${className}`} style={rotate ? { transform: "rotate(-1deg)" } : undefined}>
      <div className={`${colours.bg} px-1 py-0 lg:px-1.5 lg:py-0.5`}>
        <span className={`font-greed font-bold ${colours.text} text-[18px] lg:text-[24px] leading-[1.3] uppercase`}>
          {children}
        </span>
      </div>
    </div>
  );
}
