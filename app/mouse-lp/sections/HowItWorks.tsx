import Image from "next/image";
import { redirectTo } from "@/lib/redirect";
import { TRIAL_OFFER_PATH } from "@/lib/routes";

const STEPS = [
  {
    image: "/lps/General_Page_Assets/illo-list-step-1.png",
    alt: "Tell us about your cat",
    title: "1. Tell us about them",
    body: "Tell us a few details and we'll work out a personalised food plan based on their age, breed, activity levels and preferences.",
  },
  {
    image: "/lps/General_Page_Assets/illo-list-step-2.png",
    alt: "Fresh meals delivered",
    title: "2. Fresh meals delivered",
    body: "We'll send your 14-day trial box to start: 28 nutritious fresh meat meals your cat was born to eat.",
  },
  {
    image: "/lps/General_Page_Assets/illo-list-step-3.png",
    alt: "Watch them lap it up",
    title: "3. See bowls licked clean",
    body: "Serve fresh from the fridge. From the first week, cat parents report glossier coats and increased energy. Happy days!",
  },
];

function StepImage({ step, className }: { step: (typeof STEPS)[number]; className: string }) {
  return (
    <div className={`${className} shrink-0 flex items-center justify-center`}>
      <img src={step.image} alt={step.alt} className="w-full h-full object-contain" />
    </div>
  );
}

function StepText({ step, gap }: { step: (typeof STEPS)[number]; gap: string }) {
  return (
    <div className={`flex flex-col ${gap}`}>
      <h4 className="font-greed font-bold text-[#231f20] subtitle-md">{step.title}</h4>
      <p className="font-scto text-[#231f20] body-md">{step.body}</p>
    </div>
  );
}

function Arrow({ src }: { src: string }) {
  return (
    <div className="flex justify-center -my-2">
      <Image src={src} alt="" width={80} height={80} className="w-auto h-[80px]" />
    </div>
  );
}

// Three steps: zig-zag with arrows on mobile, three columns on desktop.
export default function HowItWorks() {
  return (
    <div className="bg-[#F8F8F4] px-5 pt-8 pb-12 lg:px-12 lg:pt-8 lg:pb-16 rounded-t-[12px] -mt-3 overflow-hidden section-shadow-top relative z-30">
      <div className="max-w-[500px] lg:max-w-[1280px] mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h3 className="font-greed text-[#231f20] font-bold text-center section-heading">How KatKin Works</h3>
        </div>

        <div className="lg:hidden flex flex-col">
          <div className="p-3 flex gap-4 items-start -mb-2">
            <StepImage step={STEPS[0]} className="w-[100px] h-[93px]" />
            <div className="flex-1">
              <StepText step={STEPS[0]} gap="gap-2" />
            </div>
          </div>
          <Arrow src="/lps/General_Page_Assets/img-arrow-1.png" />
          <div className="p-3 flex gap-4 items-start -mb-2">
            <div className="flex-1">
              <StepText step={STEPS[1]} gap="gap-2" />
            </div>
            <StepImage step={STEPS[1]} className="w-[100px] h-[100px]" />
          </div>
          <Arrow src="/lps/General_Page_Assets/img-arrow-2.png" />
          <div className="p-3 flex gap-4 items-start">
            <StepImage step={STEPS[2]} className="w-[100px] h-[100px]" />
            <div className="flex-1">
              <StepText step={STEPS[2]} gap="gap-2" />
            </div>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.title} className="flex flex-col gap-3 items-center text-center">
              <StepImage step={step} className="w-[120px] h-[120px]" />
              <StepText step={step} gap="gap-3" />
            </div>
          ))}
        </div>

        <div className="text-center mt-8 lg:mt-12">
          <button
            onClick={() => redirectTo(TRIAL_OFFER_PATH)}
            className="w-full lg:max-w-md lg:mx-auto bg-[#231f20] text-white font-greed font-bold py-2 lg:py-3 rounded-full cta-text cursor-pointer hover:bg-[#3a3a3a] transition-colors duration-200"
          >
            See The KatKin Difference
          </button>
        </div>
      </div>
    </div>
  );
}
