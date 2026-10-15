"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { redirectTo } from "@/lib/redirect";

type OfferBannerProps = {
  items?: ReactNode[];
  href?: string;
  scrollTargetId?: string;
  heroCTAId?: string;
  showChevron?: boolean;
  className?: string;
};

// Sticky pink offer strip under the nav. Hides once the hero CTA scrolls out of view.
export default function OfferBanner({
  items = ["Get your trial box", "Free gift", "Free delivery"],
  href,
  scrollTargetId = "fresh-feast-trial",
  heroCTAId = "hero-cta",
  showChevron = true,
  className = "",
}: OfferBannerProps) {
  const [visible, setVisible] = useState(true);
  const [unfurled, setUnfurled] = useState(false);

  useEffect(() => {
    const unfurlTimer = setTimeout(() => setUnfurled(true), 100);
    let observer: IntersectionObserver | null = null;
    const check = (el: Element) => setVisible(el.getBoundingClientRect().bottom >= 0);

    const frame = window.requestAnimationFrame(() => {
      const cta = document.getElementById(heroCTAId);
      if (!cta) return;
      check(cta);
      observer = new IntersectionObserver(
        ([entry]) => setVisible(!(!entry.isIntersecting && entry.boundingClientRect.top < 0)),
        { threshold: 0 },
      );
      observer.observe(cta);
    });
    // Back/forward cache restores skip the observer's first callback.
    const onPageShow = () => {
      const cta = document.getElementById(heroCTAId);
      if (cta) check(cta);
    };

    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", onPageShow);
      observer?.disconnect();
      clearTimeout(unfurlTimer);
    };
  }, [heroCTAId]);

  const handleClick = () => {
    if (href) redirectTo(href);
    else document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
      className={`fixed top-[50px] md:top-[60px] lg:top-[70px] left-0 right-0 z-40 bg-[#ea8bed] transition-opacity duration-500 ease-out cursor-pointer hover:opacity-90 active:opacity-80 ${unfurled ? "banner-unfurl" : "banner-hidden"} ${className}`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="max-w-[390px] md:max-w-[768px] lg:max-w-[1200px] mx-auto">
        <div className="flex items-center justify-center gap-1 md:gap-2 px-4 md:px-6 lg:px-8 py-2 h-[40px] md:h-[50px]">
          <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
            <Image
              src="/lps/General_Page_Assets/icon-discount-tag.png"
              alt="Discount tag"
              width={20}
              height={20}
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center gap-1 font-greed font-bold text-[#231f20] body-md leading-none tracking-[-0.36px] whitespace-nowrap">
            {items.map((item, i) => (
              <Fragment key={i}>
                {i > 0 && <span>+</span>}
                <span>{item}</span>
              </Fragment>
            ))}
          </div>
          {showChevron && (
            <div className="shrink-0 w-5 h-5 flex items-center justify-center">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="#231f20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
