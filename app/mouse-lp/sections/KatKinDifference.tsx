"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BenefitPill from "@/components/BenefitPill";
import SectionTag from "@/components/SectionTag";

const FEATURES = [
  {
    title: "100% human-grade meat + fish",
    description: "The same quality you'd expect from your local butcher.",
    icon: "/lps/General_Page_Assets/icon-product-2x2-quality-protein.png",
  },
  {
    title: "High in moisture + digestibility",
    description: "75% moisture to support hydration and digestion, just like in the wild.",
    icon: "/lps/General_Page_Assets/icon-product-2x2-tasty.png",
  },
  {
    title: "Fussy cat approved",
    description: "When food is this fresh, flavour comes naturally. Bowls licked clean.",
    icon: "/lps/General_Page_Assets/icon-product-2x2-tasty.png",
  },
  {
    title: "Customised for them",
    description: "Each tray contains the exact daily calories and nutrition they need.",
    icon: "/lps/General_Page_Assets/icon-product-2x2-portioned.png",
  },
];

const PILLS = ["100% real meat + fish", "Naturally high in protein", "Gently cooked to lock in moisture"];

// Staggered fade-up for the 2x2 feature grid.
const featureDelay = (i: number) => 0.6 + 0.3 * Math.floor(i / 2) + (i % 2) * 0.05;

function featureStyle(shown: boolean, i: number) {
  const delay = featureDelay(i);
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
  };
}

function Flatlay() {
  return (
    <Image
      src="/lps/General_Page_Assets/img-katkin-flatlay.png"
      alt="KatKin fresh cat food ingredients - 100% real meat"
      fill
      className="object-contain"
    />
  );
}

function SafetyNote({ desktop }: { desktop?: boolean }) {
  return (
    <div
      className={`${desktop ? "mt-12 max-w-[576px]" : "mt-8 max-w-md"} mx-auto bg-[#DEDCF3] rounded-[4px] p-3 flex items-start gap-3`}
    >
      <div className="flex-shrink-0 w-12 h-12">
        <img
          src="/lps/General_Page_Assets/icon-product-2x2-vet-formulated.png"
          alt="Vet formulated"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className={`font-greed text-[#231f20] font-bold subtitle-md ${desktop ? "mb-1 lg:mb-2" : "mb-1"}`}>
          We put their safety first
        </h3>
        <p className={`font-scto text-[#231f20] ${desktop ? "body-md" : "body-sm"}`}>
          All our recipes are formulated by our board-certified vet nutritionist and in-house animal nutrition team. And
          every recipe is cooked fresh daily in our Suffolk kitchen.
        </p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <>
      <SectionTag className="mb-1 lg:mb-2">The KatKin difference</SectionTag>
      <h2 className="font-greed font-bold text-[#231f20] section-heading text-center mb-3 lg:mb-4">
        A happy, healthy cat starts with <span className="text-[#256c41]">real food</span>
      </h2>
    </>
  );
}

// "A happy, healthy cat starts with real food": chopping board, spinning flatlay with pills, 2x2 features.
export default function KatKinDifference() {
  const [diamondsShown, setDiamondsShown] = useState(false);
  const [contentShown, setContentShown] = useState(false);
  const [armed, setArmed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);

  // Animations only arm after 500ms so they don't fire during the initial layout.
  useEffect(() => {
    const timer = setTimeout(() => setArmed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDiamondsShown(true);
      },
      { threshold: 0.4 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [armed]);

  useEffect(() => {
    if (!armed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setContentShown(true);
      },
      { threshold: 0.3 },
    );
    if (mobileContentRef.current) observer.observe(mobileContentRef.current);
    if (desktopContentRef.current) observer.observe(desktopContentRef.current);
    return () => observer.disconnect();
  }, [armed]);

  const flatlaySpin = {
    transform: contentShown ? "rotate(0deg)" : "rotate(-30deg)",
    transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
    zIndex: 1,
  };
  const diamond = (delay: string) => ({
    opacity: diamondsShown ? 1 : 0,
    transform: diamondsShown ? "scale(1)" : "scale(0.6)",
    transition: `opacity 0.5s ease-out${delay}, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)${delay}`,
  });
  const pillClass = `absolute pill-slide-in ${contentShown ? "animate" : ""}`;

  return (
    <section
      ref={sectionRef}
      className="bg-white rounded-t-[12px] -mt-3 section-shadow-top relative overflow-visible z-5"
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-[130px] lg:-top-[180px] z-20 w-full flex justify-center pointer-events-none">
        <div className="relative w-[315px] h-[226px] lg:w-[473px] lg:h-[336px]" style={{ transform: "rotate(-2.5deg)" }}>
          <Image
            src="/lps/General_Page_Assets/img-KatKin-cluck-board.png"
            alt="KatKin fresh meat recipe on wooden board"
            fill
            className="object-contain"
          />
          <div
            className="absolute top-4 right-[22px] w-[32px] h-[32px] lg:top-6 lg:right-[24px] lg:w-[44px] lg:h-[44px]"
            style={diamond("")}
          >
            <Image src="/lps/General_Page_Assets/diamond-pattern-right.png" alt="" fill className="object-contain" />
          </div>
          <div
            className="absolute bottom-6 left-4 w-[28px] h-[28px] lg:bottom-8 lg:left-6 lg:w-[38px] lg:h-[38px]"
            style={diamond(" 0.15s")}
          >
            <Image src="/lps/General_Page_Assets/diamond-pattern-left.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      <div className="lg:hidden relative px-5 pt-[108px] pb-10 overflow-hidden">
        <div className="max-w-[500px] mx-auto">
          <div className="text-center mb-8">
            <Heading />
          </div>
          <div ref={mobileContentRef} className="relative mb-8" style={{ marginTop: "0px" }}>
            <div className="relative w-full h-[300px] overflow-visible">
              <div className="absolute w-[340px] h-[340px]" style={{ left: "-85px", top: "0", ...flatlaySpin }}>
                <Flatlay />
              </div>
              <div className={pillClass} style={{ top: "72px", left: "63px", zIndex: 2 }}>
                <BenefitPill text={PILLS[0]} variant="lavender" />
              </div>
              <div className={pillClass} style={{ top: "152px", left: "147px", animationDelay: "0.2s", zIndex: 2 }}>
                <BenefitPill text={PILLS[1]} variant="lavender" />
              </div>
              <div className={pillClass} style={{ top: "232px", left: "63px", animationDelay: "0.4s", zIndex: 2 }}>
                <BenefitPill text={PILLS[2]} variant="lavender" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 relative" style={{ marginTop: "-20px", zIndex: 3 }}>
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex flex-col gap-1 text-center" style={featureStyle(contentShown, i)}>
                <div className="w-[64px] h-[64px] relative flex-shrink-0 mb-1 mx-auto">
                  <Image src={feature.icon} alt="" fill className="object-contain" />
                </div>
                <h3 className="font-greed font-bold text-[#231f20] subtitle-md">{feature.title}</h3>
                <p className="font-scto text-[#231f20] body-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          <SafetyNote />
        </div>
      </div>

      <div className="hidden lg:block relative pt-[180px] pb-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-12 xl:px-16">
          <div className="text-center mb-12">
            <Heading />
          </div>
          <div ref={desktopContentRef} className="flex items-center gap-16" style={{ marginTop: "12px" }}>
            <div className="relative flex-shrink-0" style={{ width: "450px", height: "450px" }}>
              <div className="absolute w-[450px] h-[450px]" style={{ left: "0", top: "0", ...flatlaySpin }}>
                <Flatlay />
              </div>
              <div className={pillClass} style={{ top: "95px", left: "52px", zIndex: 2 }}>
                <BenefitPill text={PILLS[0]} variant="lavender" />
              </div>
              <div className={pillClass} style={{ top: "200px", left: "224px", animationDelay: "0.2s", zIndex: 2 }}>
                <BenefitPill text={PILLS[1]} variant="lavender" />
              </div>
              <div className={pillClass} style={{ top: "305px", left: "52px", animationDelay: "0.4s", zIndex: 2 }}>
                <BenefitPill text={PILLS[2]} variant="lavender" />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-8">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex flex-col gap-2" style={featureStyle(contentShown, i)}>
                  <div className="w-[64px] h-[64px] lg:w-20 lg:h-20 relative flex-shrink-0">
                    <Image src={feature.icon} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="font-greed font-bold text-[#231f20] subtitle-md">{feature.title}</h3>
                  <p className="font-scto text-[#231f20] body-md">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <SafetyNote desktop />
        </div>
      </div>
    </section>
  );
}
