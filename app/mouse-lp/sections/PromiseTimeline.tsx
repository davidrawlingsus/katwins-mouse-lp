"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTag from "@/components/SectionTag";

const WEEKS = [
  {
    image: "week-1-begging.png",
    alt: "Week 1 - Less begging",
    tag: "Week 1",
    title: "Less fuss, begging and waste",
    description: "Our tasty recipes tempt even picky eaters, packed with protein to keep them full.",
    quote:
      "Prior to KatKin he just seemed to want feeding all the time - even with food in his bowl. That has miraculously stopped. He seems so much more satisfied.",
    author: "Sarah M.",
  },
  {
    image: "week-2-energy.png",
    alt: "Week 2 - More energy",
    tag: "Week 2",
    title: "More energy + playfulness",
    description: "Proper nutrition gives them the energy to be their playful selves again.",
    quote:
      "He has more energy but also seems more chilled as isn't always begging, his coat is glossier and his litter doesn't smell. So it really has lived up to expectations.",
    author: "Lauren",
  },
  {
    image: "week-3-coat.png",
    alt: "Week 3 - Shinier coat",
    tag: "Week 3",
    title: "Shinier coat, better digestion",
    description: "Real meat provides the nutrients they need for a glossy coat and healthy gut.",
    quote:
      "My 17-year-old long haired Persian Cross was starting to look a bit scraggy. I swapped him to KatKin about 3 weeks ago and it's done wonders - his coat is smooth and sleek and he eats it all",
    author: "Jane F.",
  },
  {
    image: "week-4-weight.png",
    alt: "Week 4 - Healthy weight",
    tag: "Week 4 and beyond",
    title: "Healthy weight achieved",
    description: "Personalised nutrition helps them reach and maintain their ideal weight.",
    quote:
      "She was so underweight and constantly hungry. We switched to KatKin and she's gained weight for the first time in 12 months!",
    author: "Emma R.",
  },
];

// Mobile and desktop pull the same illustrations from different asset folders on the live site.
const MOBILE_ASSETS = "/lps/General_Page_Assets";
const DESKTOP_ASSETS = "/lps/Hungry_Cat_LP/Assets";

const quoteTilt = (i: number) => (i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)");

function Quote({ index }: { index: number }) {
  const week = WEEKS[index];
  return (
    <div className="bg-[#EEEFE4] pt-4 pb-5 px-4" style={{ transform: quoteTilt(index) }}>
      <div className="flex flex-col gap-3">
        <p className="font-scto text-[#231f20] body-sm">&quot;{week.quote}&quot;</p>
        <div className="flex items-center gap-2">
          <Image
            src="/lps/General_Page_Assets/trustpilot-stars.png"
            alt="Trustpilot stars"
            width={96}
            height={18}
            className="h-[18px] w-[96px]"
          />
          <span className="font-greed font-bold text-[#231f20] text-[16px] leading-none tracking-[-0.32px]">
            {week.author}
          </span>
        </div>
      </div>
    </div>
  );
}

function WeekCopy({ index, descriptionClass = "" }: { index: number; descriptionClass?: string }) {
  const week = WEEKS[index];
  return (
    <>
      <div className="flex items-center justify-start">
        <SectionTag variant="black">{week.tag}</SectionTag>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-greed font-bold text-[#231f20] subtitle-md">{week.title}</h4>
        <p className={`font-scto text-[#231f20] body-md ${descriptionClass}`.trim()}>{week.description}</p>
      </div>
    </>
  );
}

function WeekIcon({ index, folder }: { index: number; folder: string }) {
  const week = WEEKS[index];
  return (
    <div className="flex justify-start">
      <Image src={`${folder}/${week.image}`} alt={week.alt} width={80} height={80} className="object-contain w-20 h-20" />
    </div>
  );
}

// "Real changes you'll see": trial box drops in, then a week-by-week timeline.
export default function PromiseTimeline() {
  const [weeksShown, setWeeksShown] = useState([false, false, false, false]);
  const [boxShown, setBoxShown] = useState(false);
  const [leftSparkShown, setLeftSparkShown] = useState(false);
  const [rightSparkShown, setRightSparkShown] = useState(false);
  const weekRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (boxRef.current && !boxShown) {
        if (boxRef.current.getBoundingClientRect().top < 0.85 * window.innerHeight) {
          setBoxShown(true);
          setTimeout(() => setLeftSparkShown(true), 400);
          setTimeout(() => setRightSparkShown(true), 550);
        }
      }
      weekRefs.forEach((ref, i) => {
        if (!ref.current || weeksShown[i]) return;
        if (ref.current.getBoundingClientRect().top < 0.85 * window.innerHeight) {
          setWeeksShown((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeksShown, boxShown]);

  const slideIn = (i: number) =>
    `flex flex-col gap-2 w-full mb-8 lg:opacity-100 lg:translate-x-0 transition-all duration-700 ease-out ${weeksShown[i] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`;

  return (
    <div className="bg-white px-5 md:px-8 lg:px-12 pt-[144px] pb-8 lg:pb-10 rounded-t-[20px] -mt-[32px] overflow-visible section-shadow-top relative z-[5]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[122px] w-[277px] h-[260px] z-50 scale-90">
        <div ref={boxRef} className={`relative w-full h-full ${boxShown ? "animate-slide-down" : "opacity-0 -translate-y-10"}`}>
          <Image
            src="/lps/General_Page_Assets/img-katkin-trial-box.png"
            alt="KatKin trial box"
            width={277}
            height={260}
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className={`absolute left-[-18px] bottom-[34px] w-[41px] h-[42px] -scale-x-100 rotate-[163deg] ${leftSparkShown ? "animate-slide-in-right" : "opacity-0"}`}
        >
          <Image
            src="/lps/General_Page_Assets/icon-decorative-element-1.png"
            alt=""
            width={31}
            height={28}
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className={`absolute right-[-38px] bottom-[35px] w-[29px] h-[26px] rotate-[5deg] ${rightSparkShown ? "animate-slide-in-left" : "opacity-0"}`}
        >
          <Image
            src="/lps/General_Page_Assets/icon-decorative-element-2.png"
            alt=""
            width={28}
            height={25}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-4 lg:mb-6">
          <SectionTag variant="chartreuse" className="mb-1 lg:mb-2">
            Our promise to you
          </SectionTag>
          <h3 className="font-greed text-[#231f20] font-bold mb-3 lg:mb-4 section-heading">Real changes you&apos;ll see</h3>
          <p className="font-scto text-[#231f20] body-lg mb-0 lg:mb-6" style={{ marginTop: "8px" }}>
            95% of cat parents see a happier, healthier cat in as little as 2 to 4 weeks.
          </p>
        </div>

        <div className="flex gap-3 items-start relative lg:hidden">
          <div className="relative w-[16px] flex-shrink-0 h-[1400px]">
            <div className="absolute left-0 top-0 w-[16px] h-[1420px] bg-[#3DB16A] rounded-full" />
            {["top-[2px]", "top-[427px]", "top-[851px]", "top-[1276px]"].map((top) => (
              <div
                key={top}
                className={`absolute left-1/2 ${top} w-[14px] h-[14px] bg-white rounded-full transform -translate-x-1/2 border-[#231f20]`}
                style={{ borderWidth: "1.5px" }}
              />
            ))}
          </div>
          <div className="flex flex-col items-start relative flex-1 w-full">
            {WEEKS.map((_, i) => (
              <div key={i} ref={weekRefs[i]} className={slideIn(i)}>
                <WeekIcon index={i} folder={MOBILE_ASSETS} />
                {i === 0 ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <WeekCopy index={i} />
                    </div>
                    <Quote index={i} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <WeekCopy index={i} />
                    <Quote index={i} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="max-w-[1228px] mx-auto">
            <div className="relative h-[16px] w-full mb-8">
              <div className="absolute top-0 left-0 right-0 h-[16px] bg-[#3DB16A] rounded-full" />
              {["0", "calc(25% + 16px)", "calc(50% + 32px)", "calc(75% + 48px)"].map((left) => (
                <div
                  key={left}
                  className="absolute top-1/2 w-[14px] h-[14px] bg-white rounded-full transform -translate-y-1/2 border-[#231f20]"
                  style={{ left, borderWidth: "1.5px" }}
                />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-12">
              {WEEKS.map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <WeekIcon index={i} folder={DESKTOP_ASSETS} />
                  <div className="flex flex-col gap-4">
                    <WeekCopy index={i} descriptionClass={i === 3 ? "min-h-[78px]" : ""} />
                    <Quote index={i} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
