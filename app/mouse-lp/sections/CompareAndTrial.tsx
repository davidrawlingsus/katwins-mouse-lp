"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTag from "@/components/SectionTag";
import { redirectTo } from "@/lib/redirect";
import { TRIAL_OFFER_PATH } from "@/lib/routes";

const COMPARISON: { katkin: ReactNode; others: ReactNode }[] = [
  { katkin: "Fresh meat so good you can eat it yourself", others: "Meat scraps, grains, fillers" },
  {
    katkin: "Gently cooked to lock in goodness, then frozen to keep fresh",
    others: "High-heat processing for shelf life sacrifices nutrition",
  },
  {
    katkin: (
      <>
        <span className="font-bold">75%</span> moisture content (same as wild prey)
      </>
    ),
    others: (
      <>
        <span className="font-bold">6-10%</span> moisture in dry food
      </>
    ),
  },
  { katkin: "Perfectly portioned to meet their calorie needs", others: "Unclear feeding guidelines" },
  { katkin: "From less than £2 a day for 100% fresh meat", others: "Low cost at the expense of ingredient quality" },
];

const TRIAL_CONTENTS: ReactNode[] = [
  "28 fresh, nutritious meals from a variety of flavours, including chicken, duck and fish",
  "Personalised switching guide",
  <>
    <span className="font-bold">Free</span> delivery
  </>,
  <>
    <span className="font-bold">Free gift:</span> 100% chicken meal topper
  </>,
  "Support when you need it, from our in-house Vet Nurse (7 days a week)",
];

function TickItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Image
        src="/lps/General_Page_Assets/icon-tick-dark-green.png"
        alt=""
        width={24}
        height={24}
        className="w-6 h-6 shrink-0 mt-0.5"
      />
      <p className="font-scto text-[#231f20] body-md">{children}</p>
    </div>
  );
}

function ComparisonCell({ tick, shaded, children }: { tick: boolean; shaded: boolean; children: ReactNode }) {
  return (
    <div className={`${shaded ? "bg-[#EEEFE4]" : "bg-white"} p-3 text-center`}>
      <div className="flex flex-col items-center gap-2">
        <Image
          src={tick ? "/lps/General_Page_Assets/green-tick-icon.png" : "/lps/General_Page_Assets/black-cross-icon.png"}
          alt={tick ? "Green tick" : "Black cross"}
          width={24}
          height={24}
        />
        <p className="font-scto text-[#231f20] body-sm">{children}</p>
      </div>
    </div>
  );
}

// The pricing card. Mobile and desktop differ only in padding and headline size.
function TrialCard({ desktop }: { desktop?: boolean }) {
  const big = desktop ? "text-[28px]" : "text-[24px]";
  return (
    <div
      className={`bg-white rounded-[8px] ${desktop ? "px-8 py-8" : "px-5 py-6"} shadow-[0_2px_12px_rgba(0,0,0,0.08)]`}
    >
      <div className="mb-5">
        <p className={`font-greed font-bold text-[#231f20] ${big} leading-none mb-1`}>
          What&apos;s in your Fresh Feast Trial:
        </p>
        <div className="bg-[#E7F170] inline-block py-0 self-start">
          <span className="font-greed font-bold text-[#231f20] subtitle-md">The essentials for a happy + healthy cat</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        {TRIAL_CONTENTS.map((item, i) => (
          <TickItem key={i}>{item}</TickItem>
        ))}
      </div>
      <div className="border-t border-[#231f20]/20 pt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`font-greed font-bold text-[#231f20] ${big} leading-none`}>Total today</span>
          <span className={`font-greed font-bold text-[#231f20] ${big} leading-none`}>£20.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-greed font-bold text-[#231f20] body-md">Price per meal</span>
          <span className="font-greed font-bold text-[#231f20] body-md">£0.71</span>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <button
          onClick={() => redirectTo(TRIAL_OFFER_PATH)}
          className="w-full bg-[#231f20] text-white font-greed font-bold cta-text py-3 px-6 rounded-full uppercase cursor-pointer hover:bg-[#3a3a3a] transition-colors duration-200"
        >
          Claim my trial offer
        </button>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Image
            src="/lps/General_Page_Assets/icon-tick-dark-green.png"
            alt=""
            width={16}
            height={16}
            className="w-4 h-4 shrink-0"
          />
          <span className="font-scto text-[#231f20] body-sm">No lock-in: Pause or cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

// "Like no other food they've tried" comparison table, then the Fresh Feast Trial offer
// (#fresh-feast-trial, the scroll target for the "See plans and pricing" buttons).
export default function CompareAndTrial() {
  const [straightened, setStraightened] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!tableRef.current || straightened) return;
      if (tableRef.current.getBoundingClientRect().top < 0.75 * window.innerHeight) setStraightened(true);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [straightened]);

  return (
    <div className="bg-[#f8f8f4] rounded-t-[12px] -mt-3 relative overflow-visible section-shadow-top z-[5]">
      <div className="bg-[#d5e709] h-[96px] lg:h-[140px] relative overflow-visible rounded-t-[12px] flex items-end justify-center z-20 pb-0">
        <div className="relative w-full max-w-[250px] lg:max-w-[300px] h-[96px] lg:h-[140px] mx-auto z-20 flex items-end -translate-y-5 lg:translate-y-0">
          <Image
            src="/lps/General_Page_Assets/cat-eating-animation.webp"
            alt="Cat eating animation"
            width={250}
            height={120}
            className="w-full h-full object-contain object-bottom cat-eating-animation lg:scale-120"
          />
        </div>
      </div>
      <div className="bg-[#f8f8f4] px-5 pt-8 pb-[168px] lg:px-38 lg:pt-14 lg:pb-[168px] relative">
        <div className="text-center mb-4">
          <SectionTag className="mb-1 lg:mb-2">katkin vs. the rest</SectionTag>
          <h3 className="font-greed text-[#231f20] font-bold mb-3 lg:mb-4 section-heading">
            Like <span className="text-[#256c41]">no other</span> food they&apos;ve tried
          </h3>
          <p className="font-scto text-[#231f20] body-lg">
            The difference between supermarket cat food and real, fresh meat.
          </p>
        </div>

        <div className="max-w-[720px] lg:max-w-[576px] mx-auto">
          <div
            ref={tableRef}
            className="relative transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${straightened ? "0deg" : "-1deg"})`, transformOrigin: "center" }}
          >
            <div className="absolute top-2 left-2 w-full h-full bg-[#231f20]" style={{ borderRadius: "2px" }} />
            <div
              className="relative border border-[#231f20] overflow-hidden"
              style={{ borderWidth: "1.75px", borderRadius: "2px" }}
            >
              <div className="grid grid-cols-2 gap-0 border-b border-[#231f20]" style={{ borderWidth: "1.75px" }}>
                <div className="bg-white p-2 text-center flex items-center justify-center">
                  <div className="flex flex-col items-center gap-0">
                    <Image
                      src="/lps/General_Page_Assets/katkin-logo.png"
                      alt="KatKin logo"
                      width={80}
                      height={32}
                      className="h-8 w-auto"
                    />
                    <div className="font-greed font-bold text-[#231f20] text-lg">Fresh Food</div>
                  </div>
                </div>
                <div className="bg-white p-2 text-center flex items-center justify-center">
                  <div className="font-greed font-bold text-[#231f20] text-lg">
                    Wet + Dry
                    <br />
                    Cat Food
                  </div>
                </div>
              </div>
              {COMPARISON.map((row, i) => {
                const last = i === COMPARISON.length - 1;
                const shaded = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-2 gap-0 ${last ? "border" : "border-b"} border-[#231f20]`}
                    style={{ borderWidth: "1.75px" }}
                  >
                    <ComparisonCell tick shaded={shaded}>
                      {row.katkin}
                    </ComparisonCell>
                    <ComparisonCell tick={false} shaded={shaded}>
                      {row.others}
                    </ComparisonCell>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          id="fresh-feast-trial"
          className="mt-8 lg:mt-10 flex flex-col items-center relative pb-0 scroll-mt-[120px]"
        >
          <div className="lg:hidden w-full max-w-[720px] mx-auto">
            <div className="relative flex items-center justify-center mb-4">
              <Image
                src="/lps/General_Page_Assets/img-decorative-element-1.png"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 absolute left-2 top-1"
              />
              <h3 className="font-greed font-bold text-[#231f20] text-center section-heading">
                Get going with our
                <br />
                Fresh Feast Trial
              </h3>
              <Image
                src="/lps/General_Page_Assets/img-decorative-element-2.png"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 absolute right-2 bottom-1"
              />
            </div>
            <div className="relative mb-2">
              <Image
                src="/lps/Meta_Fresh_Cat_Food/Assets/img-hero-try-fresh-30-30.png"
                alt="Fresh Feast Trial contents"
                width={3000}
                height={3000}
                className="w-full h-auto object-contain"
              />
            </div>
            <TrialCard />
          </div>

          <div className="hidden lg:block w-full max-w-[1400px] mx-auto">
            <div className="relative flex items-center justify-center mb-8">
              <Image
                src="/lps/General_Page_Assets/img-decorative-element-1.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 absolute left-[20%] top-0"
              />
              <h3 className="font-greed font-bold text-[#231f20] text-center section-heading">
                Get going with our Fresh Feast Trial
              </h3>
              <Image
                src="/lps/General_Page_Assets/img-decorative-element-2.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 absolute right-[20%] bottom-0"
              />
            </div>
            <div className="flex gap-12 items-start">
              <div className="flex-1">
                <Image
                  src="/lps/Meta_Fresh_Cat_Food/Assets/img-hero-try-fresh-30-30.png"
                  alt="Fresh Feast Trial contents"
                  width={3000}
                  height={3000}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <TrialCard desktop />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
