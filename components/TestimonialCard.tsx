import Image from "next/image";
import BenefitPill from "@/components/BenefitPill";
import { Testimonial } from "@/lib/testimonials";

// `sand` gives the card a sand (#E0E0D1) background, for use on white sections.
export function TestimonialCard({ testimonial, sand = false }: { testimonial: Testimonial; sand?: boolean }) {
  return (
    <div
      className={`${sand ? "bg-[#E0E0D1]" : "bg-white"} rounded-sm p-4 h-full`}
      style={{ boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)" }}
    >
      <div className="flex justify-between items-center mb-4">
        <Image src="/lps/General_Page_Assets/trustpilot-stars.png" alt="Trustpilot stars" width={95} height={18} />
        <BenefitPill text={testimonial.pill} variant="green" textSize="text-sm" />
      </div>
      <div className="rounded overflow-hidden mb-4 relative aspect-[294/200]">
        {testimonial.image === "placeholder" ? (
          <div className="w-full h-full bg-[#d0d0d0]" />
        ) : (
          <Image src={testimonial.image} alt="Happy cat" fill className="object-cover" />
        )}
      </div>
      <h4 className="font-greed font-bold text-[#231f20] subtitle-md mb-2">{testimonial.title}</h4>
      <p className="font-scto text-[#231f20] body-sm mb-4">&quot;{testimonial.content}&quot;</p>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: testimonial.authorBgColor }}
        >
          <span className="font-scto text-[#231f20] body-sm font-medium">{testimonial.authorInitial}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <p className="font-greed text-[#231f20] text-lg font-bold">{testimonial.authorName}</p>
          {testimonial.verified !== false && (
            <div className="bg-[#F8F8F4] pl-1 pr-1.5 py-1 rounded-sm flex items-center gap-1">
              <div className="w-3 h-3 bg-[#256c41] rounded-full flex items-center justify-center">
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-white">
                  <path
                    d="M1 3L3 5L7 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-scto text-[#231f20] body-xs">Verified</span>
            </div>
          )}
          {testimonial.date && (
            <div className="bg-[#F8F8F4] pl-1 pr-1.5 py-1 rounded-sm flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#231f20]">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                <path d="M6 3V6L8 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span className="font-scto text-[#231f20] body-xs">{testimonial.date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
