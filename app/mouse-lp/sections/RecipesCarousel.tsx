"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";
import SectionTag from "@/components/SectionTag";
import { redirectTo } from "@/lib/redirect";
import { TRIAL_OFFER_PATH } from "@/lib/routes";

const RECIPES = [
  {
    name: "CLUCK",
    description: "100% gently-cooked <strong>chicken</strong> thigh, liver and heart",
    image: "/lps/General_Page_Assets/recipe-cluck.png",
    illustration: "/lps/General_Page_Assets/KK ICONS RECIPE_CLUCK.svg",
  },
  {
    name: "MOOO",
    description: "Fresh, 100% gently-cooked <strong>beef</strong> trim, heart and liver",
    image: "/lps/General_Page_Assets/recipe-mooo.png",
    illustration: "/lps/General_Page_Assets/KK ICONS RECIPE_MOOO.svg",
  },
  {
    name: "GOBBLE",
    description: "100% gently-cooked <strong>turkey</strong> thigh, liver and <strong>chicken</strong> thigh",
    image: "/lps/General_Page_Assets/recipe-gobble.png",
    illustration: "/lps/General_Page_Assets/KK ICONS RECIPE_GOBBLE.svg",
  },
  {
    name: "SPLASH",
    description: "100% gently-cooked <strong>whitefish</strong>, <strong>salmon</strong> and <strong>turkey</strong> liver",
    image: "/lps/General_Page_Assets/recipe-splash.png",
    illustration: "/lps/General_Page_Assets/KK ICONS RECIPE_SPLASH.svg",
  },
  {
    name: "QUACK",
    description: "Fresh, 100% gently-cooked <strong>duck</strong> and <strong>chicken</strong>",
    image: "/lps/General_Page_Assets/recipe-quack.png",
    illustration: "/lps/General_Page_Assets/KK ICONS RECIPE_QUACK.svg",
  },
  {
    name: "BAAA",
    description: "Fresh, 100% gently-cooked <strong>lamb</strong> heart, trim and liver",
    image: "/lps/General_Page_Assets/recipe-baaa.png",
    illustration: "/lps/General_Page_Assets/KK ICONS RECIPE_BAAA.svg",
  },
  {
    name: "OINK",
    description: "Fresh, 100% gently-cooked <strong>pork</strong> shoulder, trim and liver",
    image: "/lps/General_Page_Assets/recipe-oink.png",
    illustration: "/lps/General_Page_Assets/KK ICONS RECIPE_OINK.svg",
  },
];

// Mobile shows ~2 cards at a time, desktop 4; the last index is where the final card is flush right.
const MOBILE_LAST = RECIPES.length - 2;
const DESKTOP_LAST = RECIPES.length - 4;

// The plate is tilted at rest and straightens on hover.
const tiltPlate = (rotation: string) => (e: MouseEvent<HTMLDivElement>) => {
  const plate = e.currentTarget.querySelector<HTMLElement>(".plate-image");
  if (plate) plate.style.transform = `rotate(${rotation})`;
};

function RecipeCard({ recipe, desktop }: { recipe: (typeof RECIPES)[number]; desktop?: boolean }) {
  return (
    <div
      className={
        desktop
          ? "w-[292px] flex-shrink-0 bg-white rounded-[8px] overflow-visible shadow-[0_2px_8px_rgba(0,0,0,0.08)] relative hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow group"
          : "w-[165px] flex-shrink-0 bg-white rounded-[4px] overflow-visible shadow-[0_2px_8px_rgba(0,0,0,0.08)] relative transition-shadow group"
      }
      onMouseEnter={tiltPlate("0deg")}
      onMouseLeave={tiltPlate("15deg")}
    >
      <div
        className={`relative ${desktop ? "h-[220px] rounded-t-[8px]" : "h-[162px] rounded-t-[4px]"} bg-white overflow-hidden pt-4`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={recipe.image}
            alt={`${recipe.name} recipe`}
            width={desktop ? 216 : 149}
            height={desktop ? 162 : 131}
            className="object-contain plate-image"
            style={{ transform: "rotate(15deg)", transition: "transform 0.3s ease" }}
          />
        </div>
        <Image
          src={recipe.illustration}
          alt={`${recipe.name} illustration`}
          width={desktop ? 64 : 48}
          height={desktop ? 64 : 48}
          className={`absolute bottom-1 right-1 ${desktop ? "w-16 h-16" : "w-12 h-12"} object-contain z-10`}
        />
      </div>
      <div
        className={`absolute ${desktop ? "top-[184px] left-[16px]" : "top-[148px] left-[13px]"} z-20`}
        style={{ transform: "rotate(-1deg)" }}
      >
        <div className={`bg-[#231f20] ${desktop ? "px-1.5" : "px-1"} py-0.5`}>
          <p
            className={`font-greed font-bold text-white ${desktop ? "text-[28px] tracking-[-0.56px]" : "text-[24px] tracking-[-0.48px]"} leading-none`}
          >
            {recipe.name}
          </p>
        </div>
      </div>
      <div className={`px-3 ${desktop ? "pt-8 pb-3" : "pt-6 pb-4"} flex flex-col gap-2`}>
        <p
          className={`font-scto text-[#231f20] body-sm ${desktop ? "h-[58px]" : "h-[62px]"} overflow-hidden`}
          dangerouslySetInnerHTML={{ __html: recipe.description }}
        />
      </div>
    </div>
  );
}

function Chevron({ direction, disabled, onClick, large }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void; large?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${large ? "w-12 h-12" : "w-10 h-10"} bg-white border-2 rounded-full flex items-center justify-center transition-all duration-200 ${disabled ? "border-[#231f20]/30 cursor-not-allowed" : "border-[#231f20] hover:bg-[#f8f8f4]"}`}
      aria-label={direction === "prev" ? "Previous recipe" : "Next recipe"}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={disabled ? "text-[#231f20]/30" : "text-[#231f20]"}>
        <path
          d={direction === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// "Variety that keeps them excited": seven recipe cards in a paged carousel.
export default function RecipesCarousel() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);

  const next = () => setMobileIndex((i) => Math.min(i + 1, MOBILE_LAST));
  const prev = () => setMobileIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="bg-[#E0E0D1] px-6 pt-8 pb-12 lg:px-12 lg:pt-8 lg:pb-16 rounded-t-[12px] -mt-3 overflow-hidden section-shadow-top relative z-20">
      <div className="max-w-[358px] lg:max-w-[1400px] mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <SectionTag className="mb-1 lg:mb-2">What&apos;s on the menu</SectionTag>
          <h3 className="font-greed text-[#231f20] font-bold text-center mb-3 lg:mb-4 section-heading">
            Variety that keeps them <span className="text-[#256c41]">excited</span>
          </h3>
          <p className="font-scto text-[#231f20] body-lg text-center" style={{ marginTop: "8px" }}>
            7 different recipes. Same quality ingredients. No more mealtime boredom.
          </p>
        </div>

        <div className="lg:hidden">
          <div
            className="overflow-hidden py-2 mb-4"
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              const distance = touchStart - touchEnd;
              if (distance > 50) next();
              if (distance < -50) prev();
              setTouchStart(0);
              setTouchEnd(0);
            }}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ gap: "16px", transform: `translateX(-${181 * mobileIndex}px)` }}
            >
              {RECIPES.map((recipe, i) => (
                <RecipeCard key={`${recipe.name}-${i}`} recipe={recipe} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between max-w-[300px] mx-auto mb-6">
            <Chevron direction="prev" disabled={mobileIndex === 0} onClick={prev} />
            <div className="flex justify-center gap-2">
              {RECIPES.slice(0, -1).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIndex(i)}
                  className={`transition-all duration-200 rounded-full ${i === mobileIndex ? "w-6 h-2 bg-[#231f20]" : "w-2 h-2 bg-[#231f20]/30 hover:bg-[#231f20]/50"}`}
                  aria-label={`Go to recipe ${i + 1}`}
                />
              ))}
            </div>
            <Chevron direction="next" disabled={mobileIndex === MOBILE_LAST} onClick={next} />
          </div>
        </div>

        <div className="hidden lg:block mb-6">
          <div className="max-w-[1228px] mx-auto">
            <div className="overflow-hidden mb-6">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ gap: "20px", transform: `translateX(-${312 * desktopIndex}px)` }}
              >
                {RECIPES.map((recipe, i) => (
                  <RecipeCard key={`${recipe.name}-${i}`} recipe={recipe} desktop />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between max-w-[360px] mx-auto gap-12">
              <Chevron
                large
                direction="prev"
                disabled={desktopIndex === 0}
                onClick={() => setDesktopIndex((i) => Math.max(i - 1, 0))}
              />
              <div className="flex justify-center gap-2">
                {Array.from({ length: DESKTOP_LAST + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setDesktopIndex(i)}
                    className={`transition-all duration-200 rounded-full ${i === desktopIndex ? "w-8 h-2 bg-[#231f20]" : "w-2 h-2 bg-[#231f20]/30 hover:bg-[#231f20]/50"}`}
                    aria-label={`Go to recipe ${i + 1}`}
                  />
                ))}
              </div>
              <Chevron
                large
                direction="next"
                disabled={desktopIndex === DESKTOP_LAST}
                onClick={() => setDesktopIndex((i) => Math.min(i + 1, DESKTOP_LAST))}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-8 lg:mt-12">
          <button
            onClick={() => redirectTo(TRIAL_OFFER_PATH)}
            className="w-full lg:max-w-md lg:mx-auto bg-[#231f20] text-white font-greed font-bold py-2 lg:py-3 rounded-full cta-text cursor-pointer hover:bg-[#3a3a3a] transition-colors duration-200"
          >
            Build their personalised box
          </button>
        </div>
      </div>
    </div>
  );
}
