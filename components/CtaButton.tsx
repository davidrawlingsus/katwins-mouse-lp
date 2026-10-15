type CtaButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function CtaButton({ onClick, children, className = "" }: CtaButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-[#231f20] text-white font-greed font-bold py-3 rounded-full cta-text flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#3a3a3a] transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
