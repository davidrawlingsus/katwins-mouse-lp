"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import CtaButton from "@/components/CtaButton";
import SectionTag from "@/components/SectionTag";
import { redirectTo } from "@/lib/redirect";
import { TRIAL_OFFER_PATH } from "@/lib/routes";

const OPTIONS = [
  { id: "begging", label: "They leave food but beg for more" },
  { id: "stomach", label: "Stomach issues and smelly poos" },
  { id: "tired", label: "They seem tired or grumpy" },
  { id: "coat", label: "Dull, patchy or matted coats" },
  { id: "not-yet", label: "Not yet, and I don't want them to" },
];
// "Not yet" is exclusive: picking it clears the symptoms, picking a symptom clears it.
const NONE_OPTION = "not-yet";

const inView = (el: Element) => {
  const rect = el.getBoundingClientRect();
  const h = window.innerHeight;
  return rect.top < 0.8 * h && rect.bottom > 0.2 * h;
};

// "Does your cat show any of these signs?" multi-select.
export default function SignsQuiz({ page }: { page: string }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [catSwinging, setCatSwinging] = useState(false);
  const [optionsShown, setOptionsShown] = useState(() => OPTIONS.map(() => false));
  const mobileQuizRef = useRef<HTMLDivElement>(null);
  const desktopQuizRef = useRef<HTMLDivElement>(null);
  const mobileCatRef = useRef<HTMLDivElement>(null);
  const desktopCatRef = useRef<HTMLDivElement>(null);
  const catTriggered = useRef(false);
  const optionsTriggered = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const revealOptions = (el: HTMLElement | null) => {
        if (!el || optionsTriggered.current || !inView(el)) return;
        optionsTriggered.current = true;
        OPTIONS.forEach((_, i) => {
          timers.current.push(
            setTimeout(
              () => {
                setOptionsShown((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              },
              150 * i + 100,
            ),
          );
        });
      };
      revealOptions(mobileQuizRef.current);
      revealOptions(desktopQuizRef.current);

      const swingCat = (el: HTMLElement | null) => {
        if (!el || catTriggered.current || !inView(el)) return;
        catTriggered.current = true;
        setCatSwinging(true);
      };
      swingCat(mobileCatRef.current);
      swingCat(desktopCatRef.current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    const pending = timers.current;
    return () => {
      window.removeEventListener("scroll", onScroll);
      pending.forEach((t) => clearTimeout(t));
    };
  }, []);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (id === NONE_OPTION) {
      if (next.has(id)) next.delete(id);
      else {
        next.clear();
        next.add(id);
      }
    } else {
      next.delete(NONE_OPTION);
      if (next.has(id)) next.delete(id);
      else next.add(id);
    }

    if (next.has(id) && !selected.has(id) && posthog.__loaded) {
      const option = OPTIONS.find((o) => o.id === id);
      if (option) {
        posthog.capture("lp_quiz_option_selected", {
          page,
          option_id: option.id,
          option_label: option.label,
          selections: OPTIONS.filter((o) => next.has(o.id)).map((o) => o.label),
          selection_count: next.size,
        });
      }
    }
    setSelected(next);
  };

  const submit = () => {
    const selections = OPTIONS.filter((o) => selected.has(o.id)).map((o) => o.label);
    if (posthog.__loaded) posthog.capture("lp_quiz_submitted", { page, selections });
    redirectTo(TRIAL_OFFER_PATH);
  };

  const quiz = (ref: RefObject<HTMLDivElement | null>) => (
    <div ref={ref} data-quiz-block className="flex flex-col gap-3 w-full max-w-[520px] mx-auto">
      {OPTIONS.map((option, i) => {
        const isSelected = selected.has(option.id);
        return (
          <button
            key={option.id}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => toggle(option.id)}
            className={`w-full min-h-[56px] px-4 py-3 rounded-[8px] border text-center font-greed font-bold body-md leading-tight transition-all duration-200 cursor-pointer ${isSelected ? "bg-[#231f20] border-[#231f20] text-white" : "bg-white border-[#DCD5C1] text-[#231f20] hover:border-[#231f20]/40"}`}
            style={{
              opacity: optionsShown[i] ? 1 : 0,
              transition: "opacity 0.6s ease-out, background-color 0.2s ease, border-color 0.2s ease",
              transitionDelay: optionsShown[i] ? "0ms" : `${150 * i}ms`,
            }}
          >
            {option.label}
          </button>
        );
      })}
      <CtaButton onClick={submit} className="mt-3">
        Next →
      </CtaButton>
    </div>
  );

  return (
    <div className="bg-white rounded-t-[12px] -mt-4 overflow-hidden relative z-1 shadow-[0_-2px_12px_rgba(0,0,0,0.08),0_12px_24px_-10px_rgba(35,31,32,0.22)]">
      <div className="block lg:hidden">
        <div className="bg-[#DCD5C1] h-[68px] relative rounded-t-[12px]">
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-10">
            <SectionTag>take the quiz</SectionTag>
          </div>
          <div
            ref={mobileCatRef}
            className="absolute -top-2 right-4 h-full flex items-start justify-end"
            style={{ width: "58px" }}
          >
            <img
              src="/lps/General_Page_Assets/cat-hanging.png"
              alt="Hanging cat illustration"
              className={`object-contain h-auto ${catSwinging ? "cat-swing" : ""}`}
              style={{ width: "58px", transformOrigin: "top center" }}
            />
          </div>
        </div>
        <div className="px-5 md:px-8 pt-8 md:pt-12 pb-9 md:pb-11 bg-[#F8F8F4]">
          <h3 className="font-greed text-[#231f20] font-bold text-center mb-8 md:mb-12 section-heading">
            Does your cat show any of these signs?
          </h3>
          {quiz(mobileQuizRef)}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex items-stretch min-h-[500px]">
          <div className="w-1/2 bg-[#DCD5C1] flex justify-end rounded-tl-[12px] overflow-hidden">
            <div className="w-full max-w-[700px] relative flex flex-col px-12 xl:px-16 py-12">
              <div className="mb-2">
                <SectionTag>take the quiz</SectionTag>
              </div>
              <h3 className="font-greed text-[#231f20] font-bold section-heading">
                Does your cat show
                <br />
                any of these signs?
              </h3>
              <div className="flex-1" />
              <div ref={desktopCatRef} className="absolute top-2 right-12 w-[115px] h-auto">
                <img
                  src="/lps/General_Page_Assets/cat-hanging.png"
                  alt="Hanging cat illustration"
                  className={`object-contain w-full h-auto ${catSwinging ? "cat-swing" : ""}`}
                  style={{ transformOrigin: "top center" }}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-[#F8F8F4] flex justify-start rounded-tr-[20px] overflow-hidden">
            <div className="w-full max-w-[700px] flex flex-col px-12 xl:px-16 py-12">
              <div className="flex-1" />
              {quiz(desktopQuizRef)}
              <div className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
