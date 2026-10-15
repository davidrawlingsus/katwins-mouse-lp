# Mouse LP — "The world's second-best food for cats"

A test variant built on the same stack as KatKin's live LPs (Next.js 15.5.9 App Router, React 19, Tailwind v4,
`basePath: "/lps"`), starting from two live builds:

1. **Top:** [katkin.com/lps/mouse-lp](https://www.katkin.com/lps/mouse-lp): the mouse hero, letter and reviews.
2. **Below it:** the content sections of the control,
   [katkin.com/lps/try-fresh-cat-food-d](https://www.katkin.com/lps/try-fresh-cat-food-d), plus its sticky
   "See plans and pricing" bar.

Both started as pixel-identical rebuilds of the live pages, so every difference is deliberate. They're all listed,
with the exact classes and values, in [CHANGELOG.md](CHANGELOG.md).

```bash
npm install
npm run dev   # http://localhost:3000/lps/mouse-lp
```

Add `?discount_code=XYZ` to try other codes; an invalid code falls back to `FRESH20`.
CTAs go to `katkin.com/sign-up/fresh` (relative `/sign-up/fresh` in production), carrying the query string.

## Preview

Live preview: https://mouse-lp-production.up.railway.app (Railway project **KatWins**, service `mouse-lp`). It redirects
to `/lps/mouse-lp`; that redirect lives in `next.config.ts` and is for the preview only. Redeploy after changes with:

```bash
railway up -s mouse-lp --ci
```

## Putting it into the /lps app

1. Copy `app/mouse-lp/` (page, layout, `mouse-lp.css`, `sections/`) into the app.
2. Copy the new files: `components/ReviewGroups.tsx`, `components/TestimonialCard.tsx`, `lib/symptom-testimonials.ts`,
   `lib/testimonials.ts` (types), `lib/blob-assets.ts`.
3. Point the imports for the shared pieces (table below) at the app's own versions.
4. Host the new artwork yourselves: copy `artwork/` into the app's `public/mouse-lp/` (served at `/lps/mouse-lp/`), then
   set `BLOB` in `lib/blob-assets.ts` to `"/lps/mouse-lp"` and the paw-print URL in `mouse-lp.css` to
   `/lps/mouse-lp/mouse-paw-print.png`. (Until then they load from Vercel Blob.)
5. Don't copy `next.config.ts`: its redirect is for the preview only.

## What maps to what

| Here | Live app | Notes |
| --- | --- | --- |
| `app/mouse-lp/page.tsx`, `layout.tsx` | the `mouse-lp` page | Where the experiment lives |
| `app/mouse-lp/mouse-lp.css` | the page's stylesheet | Edited; see CHANGELOG |
| `app/mouse-lp/sections/*.tsx` | the control's sections, in page order: `SignsQuiz`, `FoodProblem` (split out of the quiz), `KatKinDifference`, `CompareAndTrial` (holds `#fresh-feast-trial`), `PromiseTimeline`, `RecipesCarousel`, `HowItWorks`, `FinalCta`, `Faq`, plus `StickyPlansBar` | The control inlines these in its page file |
| `components/ReviewGroups.tsx`, `lib/symptom-testimonials.ts` | none (new) | The symptom-grouped reviews under the letter |
| `components/TestimonialCard.tsx` | the review card from the "Don't just take our word for it" carousel | Adds a `sand` option and hides the date / "Verified" chips when absent |
| `app/styles/landing.css` | shared LP stylesheet (`font-greed`, `body-md`, `section-heading`…) | Unchanged |
| `components/OfferBanner.tsx` | sticky pink offer banner | Shared, unchanged |
| `components/BenefitPill.tsx`, `SectionTag.tsx`, `CtaButton.tsx` | pill / tag / black pill button | Shared, unchanged |
| `components/DiscountProvider.tsx`, `DiscountCopy.tsx`, `hooks/useFetch.ts`, `lib/api.ts` | discount lookup + copy fade-in | Shared, unchanged |
| `lib/redirect.ts`, `lib/routes.ts` (`SIGN_UP_PATH`, `TRIAL_OFFER_PATH` = FEAST20), `hooks/usePageEngagement.ts` | CTA redirect, PostHog scroll/time events | Shared, unchanged |

File and component names are ours. The live build is minified, so the originals' names aren't known.

Not reproduced: the live root layout's GTM, PostHog init and CAPI tracking. `posthog.capture` calls are kept but
no-op locally because PostHog never loads.

KatKin's licensed Greed and Scto Grotesk fonts aren't in this repo. To run it locally, copy them into `public/fonts/`
(`Greed-Bold.otf`, `Scto Grotesk A Regular.otf`, `Scto Grotesk A Bold.otf`) from the /lps app's own `public/fonts`.
