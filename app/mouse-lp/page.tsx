"use client";

import Image from "next/image";
import posthog from "posthog-js";
import OfferBanner from "@/components/OfferBanner";
import BenefitPill from "@/components/BenefitPill";
import ReviewGroups from "@/components/ReviewGroups";
import { DiscountCopy } from "@/components/DiscountCopy";
import { DiscountProvider, useDiscountContext } from "@/components/DiscountProvider";
import { usePageEngagement } from "@/hooks/usePageEngagement";
import { redirectTo } from "@/lib/redirect";
import { SIGN_UP_PATH } from "@/lib/routes";
import { blobAssets } from "@/lib/blob-assets";
import { symptomCategories, symptomTestimonials } from "@/lib/symptom-testimonials";
import SignsQuiz from "./sections/SignsQuiz";
import FoodProblem from "./sections/FoodProblem";
import StickyPlansBar from "./sections/StickyPlansBar";
import KatKinDifference from "./sections/KatKinDifference";
import CompareAndTrial from "./sections/CompareAndTrial";
import PromiseTimeline from "./sections/PromiseTimeline";
import RecipesCarousel from "./sections/RecipesCarousel";
import HowItWorks from "./sections/HowItWorks";
import FinalCta from "./sections/FinalCta";
import Faq from "./sections/Faq";
import "../styles/landing.css";
import "./mouse-lp.css";

const PAGE = "mouse-lp";
const BENEFIT_TEXT_SIZE = "text-[14px] md:text-[16px] lg:text-[18px] leading-[1.2]";

// Footprints leading away from "Bye!" and off the bottom of the letter.
function PawTrail() {
  return (
    <span className="mouse-paw-trail" aria-hidden="true">
      <Image src={blobAssets.mousePawTrail} alt="" width={870} height={338} />
    </span>
  );
}

function MouseLanding() {
  const { copy, state } = useDiscountContext();
  usePageEngagement(PAGE);

  const handleCta = (location: string) => {
    if (posthog.__loaded) {
      posthog.capture("cta_click", { page: PAGE, location, destination: SIGN_UP_PATH });
    }
    redirectTo(SIGN_UP_PATH);
  };

  return (
    <>
      <main className="mouse-page">
        <header className="mouse-nav">
          <a href="https://www.katkin.com" aria-label="KatKin home">
            <Image src="/lps/General_Page_Assets/katkin-logo.png" alt="KatKin" width={108} height={32} priority />
          </a>
          <a href="https://www.katkin.com/login">Login</a>
        </header>

        <OfferBanner
          items={[<DiscountCopy key="offer" copy={copy.tag} state={state} />, "Free gift", "Free delivery"]}
          href={SIGN_UP_PATH}
          showChevron={false}
        />

        <section className="mouse-hero">
          <h1>
            The world&apos;s{" "}
            <span className="mouse-best-word">
              best
              <span className="mouse-hero-note">Second</span>
            </span>
            <br />
            food for cats
          </h1>
          {/* The cat and mouse flank the sub-heading rather than taking a row of their own. */}
          <div className="mouse-sub-row">
            <p className="mouse-hero-sub">
              (First best has a tail).
              <br />
              Squeak.
            </p>
            <div className="mouse-chase" role="img" aria-label="A cat chasing a mouse carrying a Try KatKin sign">
              <Image src={blobAssets.catReachingMobile} alt="" width={390} height={399} className="mouse-chase-cat" />
              <Image src={blobAssets.mouseSignMobile} alt="" width={435} height={405} className="mouse-chase-mouse" />
              {/* Uncropped versions, swapped in from 700px where the chase no longer bleeds off the screen edges. */}
              <Image
                src={blobAssets.catPouncingFull}
                alt=""
                width={600}
                height={398}
                className="mouse-chase-cat-full"
              />
              <Image
                src={blobAssets.mouseSignFull}
                alt=""
                width={420}
                height={416}
                className="mouse-chase-mouse-full"
              />
            </div>
          </div>
          <p className="mouse-natural-diet">KatKin: The next best thing to natural...</p>
          <div className="mouse-benefits">
            <BenefitPill text="100% real meat + fish" variant="green" size="sm" textSize={BENEFIT_TEXT_SIZE} />
            <BenefitPill text="Zero grains + fillers" variant="green" size="sm" textSize={BENEFIT_TEXT_SIZE} />
            <BenefitPill
              text="Made to the prey profile of a cat in the wild"
              variant="green"
              size="sm"
              textSize={BENEFIT_TEXT_SIZE}
              wrap
            />
          </div>
          <p className="mouse-thrive">Which is why cats thrive when they eat it.</p>
          <div className="mouse-rating" aria-label="Excellent 4.6 out of 5 on Trustpilot">
            <Image
              src="/lps/General_Page_Assets/stars-4.5.svg"
              alt="Trustpilot rating: 4.6 out of 5"
              width={132}
              height={25}
            />
            <span>
              <strong>Excellent 4.6</strong>
              {"  |  13,674 reviews"}
            </span>
          </div>
          <button id="hero-cta" className="mouse-cta cta-text" onClick={() => handleCta("hero")}>
            <DiscountCopy copy={copy.cta} state={state} />
          </button>
          <p className="mouse-cta-note">Try 100% meat for less than you think</p>
        </section>

        <section className="mouse-letter-section">
          <h2 className="section-heading">
            Shhh... I&apos;ve taken over KatKin... read this kwik before they take&nbsp;it&nbsp;down...
          </h2>
          <article className="mouse-letter">
            {/* Peeks over the letter's top edge, paw resting on the paper. */}
            <Image src={blobAssets.mousePeeking} alt="" width={320} height={209} className="mouse-letter-mouse" />
            <p>Dear cat owner,</p>
            <p>This is important. I need your help!</p>
            <p>Who am I?</p>
            <p>You don&apos;t know me, but your cat sure does...</p>
            <p>For a very long time, I&apos;ve been the best food your cat could eat.</p>
            <p>That&apos;s because (unfortunately for me) your cat&apos;s:</p>
            <ul>
              <li>teeth</li>
              <li>gut</li>
              <li>kidneys</li>
              <li>even its thirst</li>
            </ul>
            <p>...are all designed around a small, warm, meaty animal – just like ickle mousey me.</p>
            <p>For millennia, nothing could nourish a cat as well as we could.</p>
            <p>Supermarket pouches? Grains, fillers &amp; sugary jellies? No chance!</p>
            <p>
              Even the fancy stuff with clever words like &apos;natural recipe&apos; and &apos;high meat&apos; – boiled
              to oblivion in a tin!
            </p>
            <p>No. I&apos;ve been watching them.</p>
            <p>The smart cats sniff it and walk away. They call those ones &apos;fussy&apos;. (I call them clever.)</p>
            <p>The others? Some get sick. Some get lazy. Most get dull coats and stinky(!) poos.</p>
            <p>But worst of all? Even when they eat it all up, they never feel full...</p>
            <p>So when they finally give up mewing for more, they come looking for us. Gulp!</p>
            <p>Oh how we&apos;ve wished for change...</p>
            <p>
              For someone, somewhere to realise, <u>mice aren&apos;t made from vegetables!</u>
            </p>
            <p>Please Almighty Dog, help us!</p>
            <p>
              And now.
              <br />
              Finally.
              <br />A miracle&apos;s happened...
            </p>
            <p>KatKin!</p>
            <p>A food purpose designed to nourish cats (almost) as well as we do...</p>
            <ul className="mouse-letter-list mouse-letter-paws">
              <li>100% real meat</li>
              <li>0% filler</li>
              <li>Moisture</li>
              <li>Muscle</li>
              <li>Organs</li>
              <li>Everything</li>
              <li>In just the right proportions</li>
              <li>In made-to-measure trays</li>
            </ul>
            <p>It&apos;s even gently steamed to keep as much goodness as possible.</p>
            <p>
              Oh Joy! Oh rapture!
              <br />
              Not a mouse in sight!
            </p>
            <p>Which is why I&apos;ve hacked this page...</p>
            <p>
              To implore you.
              <br />
              For <s className="mouse-pencil-strike">my</s> your cat&apos;s sake.
              <br />
              Please stop feeding that other stuff!
            </p>
            <p>The very best thing you can do for your cat today? Better than anything?</p>
            <p>
              <a
                href={SIGN_UP_PATH}
                className="mouse-letter-inline-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleCta("let_it_try");
                }}
              >
                Let it try KatKin.
              </a>
            </p>
            <p>Just let it try.</p>
            <p>You&apos;ll feel good every time you see the bowl licked clean.</p>
            <p>A warm glow knowing there&apos;s truly nothing better you could feed it.</p>
            <p>(Unless you want a freezer full of mice!)</p>
            <p>Yours squeakily,</p>
            <p>Mr M. Ice.</p>
            <p>P.s. nearly forgot... I&apos;ve also hacked the coupon codes!</p>
            <p>Kwik... I can hear someone coming...</p>
            <button className="mouse-letter-link" onClick={() => handleCta("letter")}>
              <DiscountCopy copy={copy.cta} state={state} />.
            </button>
            <p>You&apos;ll be pleased you did!</p>
            <p>
              Bye!
              <PawTrail />
            </p>
          </article>
        </section>

        <section className="mouse-mid-cta">
          <button className="mouse-cta cta-text" onClick={() => handleCta("after_letter")}>
            <DiscountCopy copy={copy.cta} state={state} />
            <Image
              src={blobAssets.mousePointingAtCtaCut}
              alt=""
              width={330}
              height={292}
              className="mouse-cta-pointer"
            />
          </button>
          <p className="mouse-cta-note">Try 100% meat for less than you think</p>
        </section>

        <section className="mouse-proof-intro">
          <p>
            <mark className="mouse-highlight">P.s. Don&apos;t just believe me. I&apos;m&nbsp;biased.</mark>
          </p>
          <h2 className="section-heading">Here&apos;s what owners that already feed KatKin say...</h2>
        </section>

        <div className="mouse-proof">
          <ReviewGroups items={symptomTestimonials} categories={symptomCategories} />
        </div>
      </main>

      {/* Signs quiz from try-fresh-cat-food-d, in its own block so it can be moved around the page. */}
      <div className="mouse-quiz bg-white pb-8 lg:pb-10">
        <SignsQuiz page={PAGE} />
      </div>

      {/* The rest is lifted from try-fresh-cat-food-d (minus its hero, reviews carousel, nav and offer banner). */}
      <div className="bg-[#eeefe4]">
        <div className="relative w-full bg-white">
          <FoodProblem />
          <KatKinDifference />
          <CompareAndTrial />
          <PromiseTimeline />
          <RecipesCarousel />
          <HowItWorks />
          <FinalCta />
          <Faq />
        </div>
      </div>

      <StickyPlansBar showAfter=".mouse-mid-cta" />
    </>
  );
}

export default function MouseLpPage() {
  return (
    <DiscountProvider>
      <MouseLanding />
    </DiscountProvider>
  );
}
