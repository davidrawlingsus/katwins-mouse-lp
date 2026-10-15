"use client";

import { useEffect, useState } from "react";
import CtaButton from "@/components/CtaButton";
import { redirectTo } from "@/lib/redirect";
import { TRIAL_OFFER_PATH } from "@/lib/routes";

// try-fresh-cat-food-d's sticky "See plans and pricing" bar.
// Slides up once the `showAfter` element has scrolled up past the top of the screen (the control used the hero CTA)
// and then stays up. (The control also dropped it while the quiz was on screen; here that just made it bob.)
// Until the Fresh Feast Trial (#fresh-feast-trial) has been seen it scrolls there; after that it goes to sign-up.
export default function StickyPlansBar({ showAfter }: { showAfter: string }) {
  const [triggerPassed, setTriggerPassed] = useState(false);
  const [trialSeen, setTrialSeen] = useState(false);

  useEffect(() => {
    const trigger = document.querySelector(showAfter);
    if (!trigger) return;
    // Passed = its bottom is above the top of the screen. Measured on every scroll (not with an IntersectionObserver),
    // because a jump straight from below it to the top of the page never crosses it and would leave the bar showing.
    let frame: number | null = null;
    const measure = () => {
      frame = null;
      setTriggerPassed(trigger.getBoundingClientRect().bottom < 0);
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const stopWatchingTrigger = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };

    const trial = document.getElementById("fresh-feast-trial");
    if (!trial) return stopWatchingTrigger;
    const trialObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTrialSeen(true);
        trialObserver.disconnect();
      },
      { threshold: 0 },
    );
    trialObserver.observe(trial);

    return () => {
      stopWatchingTrigger();
      trialObserver.disconnect();
    };
  }, [showAfter]);

  const handleClick = () => {
    if (trialSeen) redirectTo(TRIAL_OFFER_PATH);
    else document.getElementById("fresh-feast-trial")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] transform transition-transform duration-500 ease-out ${triggerPassed ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="w-full px-6 md:px-8 lg:px-12 py-4 md:py-5 lg:py-6 bg-[#d5e709] border-t border-[#c9d808]">
        <div className="max-w-[390px] md:max-w-[768px] lg:max-w-md mx-auto">
          <CtaButton onClick={handleClick}>See plans and pricing</CtaButton>
        </div>
      </div>
    </div>
  );
}
