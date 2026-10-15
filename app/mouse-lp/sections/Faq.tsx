"use client";

import { useState } from "react";
import SectionTag from "@/components/SectionTag";

const FAQS = [
  {
    question: "How do I know my cat will love it?",
    answer:
      "Because cats are carnivores and were born to eat real meat. All our KatKin recipes use 100% fresh real meat that's 'human-quality': this means it's good enough to be eaten by humans, too.\n\nOur dedicated product development team taste test with panels of hundreds of cats, across different ages, breeds, and personalities on an ongoing basis. Each recipe is tasted by real cats - and we only move forward when the response is overwhelmingly positive, ensuring every dish meets the high standards of our most discerning feline critics.\n\nEven fussy cats turn ravenous on KatKin: 78% of cats who were fussy at sign-up switch to KatKin within 3 days.",
  },
  {
    question: "How much does KatKin cost?",
    answer:
      "It all depends on your cat, our daily-serve trays are personalised to their calorie needs. This costs £1.42 a day per cat for our 2-week trial box. We'll show you the exact price once we create a personalised plan for them.",
  },
  {
    question: "Is KatKin a complete food?",
    answer:
      "Yes! Our fresh recipes are all formulated by a Board-Certified Vet Nutritionist to be balanced and complete, without compromise.\n\nWe hold ourselves to the highest standards by checking all our recipes thoroughly at production. Our food is cooked in our own kitchen in Suffolk and our in-house team of nutritionists test nutrient levels across every batch.\n\nOur recipes also conform to the standards of FEDIAF, AAFCO and the American National Research Council.",
  },
  {
    question: "Is KatKin suitable for kittens?",
    answer:
      "Yes! Our recipes are suitable for kittens 8 weeks and older who are past the weaning phase. Our 100% fresh meat recipes are complete and balanced, with supplemental nutrients such as taurine and calcium to help kittens grow and thrive.\n\nBecause all our fresh meals are gently steamed to lock in moisture, they are digestible and easy on kittens' delicate stomachs.",
  },
  {
    question: "Is KatKin suitable for senior cats (aged 9+)?",
    answer:
      "Yes! KatKin is suitable for cats of all life stages, including senior cats.\n\nOur recipes are 100% meat and packed full of highly-digestible protein. Protein plays an important role in the nutritional management of arthritis which 90% of all cats over the age of 12 are likely to have.\n\nAs KatKin is also suitable for kittens, calcium and phosphorus levels in our food may be slightly higher to account for kittens' needs. This won't detract from meeting a senior cat's needs, but if they have kidney disease, they may need a reduced phosphorus diet. We'd advise you to discuss a change to their diet with your vet, if this is the case.",
  },
  {
    question: "Where do you deliver to?",
    answer:
      "Right now, we deliver to most of England, Wales and south mainland Scotland. While we'd love to deliver everywhere, we have a restricted delivery radius that's specified by our couriers because our food is frozen to keep fresh.\n\nThis means we don't deliver at present to: the Highlands and Islands, the Isle of Man, the Scilly Isles, the Channel Islands, and Northern Ireland. Hopefully, as we grow and scale we'll be able to welcome you and your cat to KatKin!",
  },
  {
    question: "Can I cancel my deliveries at any time?",
    answer:
      "Yes - there is no lock-in into our subscription. You can easily pause, cancel or delay your deliveries whenever you want, in your online account or by calling 020 4538 4144. No hidden charges. No contracts.",
  },
];

// "Questions we often hear": tilted illustration beside a single-open accordion (first item open).
export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#EEEFE4] rounded-t-[12px] -mt-3 relative z-60 px-6 pt-8 pb-24 lg:px-12 lg:pt-8 lg:pb-[140px] section-shadow-top">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-1 lg:gap-2 items-center mb-6 lg:mb-8">
          <SectionTag>FAQs</SectionTag>
          <h2 className="font-greed font-bold text-[#231f20] section-heading text-center">Questions we often hear</h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-24 lg:items-center max-w-[1280px] mx-auto">
          <div className="relative mb-8 lg:mb-0 flex items-center justify-center lg:flex-1">
            <div className="relative w-[84%]" style={{ transform: "rotate(-2.5deg)" }}>
              <div className="absolute top-2 left-2 w-full h-full bg-[#231f20] rounded-[4px] lg:rounded-[8px]" />
              <img
                src="/lps/General_Page_Assets/img-faq-section.png"
                alt="Happy cat illustration"
                className="relative w-full h-auto object-cover rounded-[4px] lg:rounded-[8px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-[600px] mx-auto lg:mx-0 lg:flex-1">
            {FAQS.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div key={i} className="flex flex-col gap-1">
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex gap-4 items-center justify-between w-full text-left group"
                  >
                    <p className="font-greed font-bold text-[#231f20] subtitle-md flex-1">{faq.question}</p>
                    <div className="relative shrink-0 w-[20px] h-[20px] flex items-center justify-center">
                      <img
                        src={open ? "/lps/General_Page_Assets/icon-x-circle.svg" : "/lps/General_Page_Assets/icon-plus-circle.svg"}
                        alt={open ? "Collapse" : "Expand"}
                        className="w-full h-full transition-opacity duration-200"
                      />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                  >
                    <p className="font-scto text-[#231f20] body-md">{faq.answer}</p>
                  </div>
                  <div className="h-[1px] bg-[#231f20] w-full mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
