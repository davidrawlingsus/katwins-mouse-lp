import Image from "next/image";
import { redirectTo } from "@/lib/redirect";
import { TRIAL_OFFER_PATH } from "@/lib/routes";

// "Ready to see the difference?" on chartreuse.
export default function FinalCta() {
  return (
    <div className="bg-[#d5e709] pt-6 pb-12 lg:pt-6 lg:pb-12 text-center rounded-t-[16px] -mt-3 overflow-hidden section-shadow-top relative z-50 flex flex-col items-center gap-4">
      <div className="w-full h-[108px] relative px-6 lg:px-12">
        <Image
          src="/lps/General_Page_Assets/section/illo-final-hook-chase.png"
          alt="Cat chasing illustration"
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-greed text-[#231f20] font-bold section-heading px-6 lg:px-12">Ready to see the difference?</h3>
      <div className="w-full max-w-md flex flex-col gap-2 px-6 lg:px-12">
        <button
          onClick={() => redirectTo(TRIAL_OFFER_PATH)}
          className="w-full bg-[#231f20] text-white font-greed font-bold py-2 lg:py-2.5 px-3 rounded-full cta-text cursor-pointer hover:bg-[#3a3a3a] transition-colors duration-200"
        >
          CLAIM MY TRIAL OFFER
        </button>
        <p className="font-scto text-[#231f20] body-sm">No lock in. Cancel anytime. Free delivery</p>
      </div>
    </div>
  );
}
