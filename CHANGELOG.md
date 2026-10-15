# Mouse LP: change log

Changes made to the mouse landing page (`/lps/mouse-lp`). The starting point was a rebuild of the live page
that renders pixel-identical to it, so everything listed here is a deliberate change, not a rebuild difference.

Files referenced:
- `app/mouse-lp/page.tsx`: the page markup
- `app/mouse-lp/mouse-lp.css`: the page stylesheet
- `lib/blob-assets.ts`: URLs for the new artwork (see [Assets](#assets))

Breakpoints are the ones already used in the live stylesheet: phone (< 700px), tablet (700px+), desktop (1024px+),
and short desktop (1024px+ and ≤ 1000px tall).

---

## 1. Page structure

### Sections from try-fresh-cat-food-d appended below the mouse page
The mouse page's sections come first. Below them come these sections from `/lps/try-fresh-cat-food-d`, in their
original order: signs quiz, "Maybe it's to do with their food..." (now "Want to know why it works?", see section 6), KatKin
difference, comparison table + Fresh Feast Trial, promise timeline, recipes carousel, how it works, final CTA, FAQs.
They live in `app/mouse-lp/sections/`.

- Left out as universal elements: that page's nav and pink offer banner (the mouse page has its own), and the
  `try_fresh_cat_food_d_variant` cookie.
- **Kept: the sticky "See plans and pricing" bottom bar** (`sections/StickyPlansBar.tsx`), so the control's persistent
  CTA isn't a missing confound. Look and click behaviour are unchanged: it scrolls to `#fresh-feast-trial` until that's
  been seen, then sends people to sign-up with `discount_code=FEAST20`. Two differences from the control:
  - **Trigger:** it slides up once the after-letter CTA section (`.mouse-mid-cta`) has scrolled up past the top of the
    screen, rather than when `#hero-cta` leaves the screen (`<StickyPlansBar showAfter=".mouse-mid-cta" />`). That
    position is measured on scroll, so jumping straight back to the top of the page hides the bar again.
  - **No hiding over the quiz:** the control drops the bar while a `[data-quiz-block]` is on screen. Here the quiz comes
    right after the trigger, so that made the bar bob down and up; once up, it now stays up.
- **Its hero is removed** ("If cats could thrive on grains, fillers & clever marketing…", the
  `section.relative.overflow-hidden.bg-[#eeefe4]` block with the trial-box image and £0.71 sticker).
- **Its reviews carousel is removed** (the sand "Real transformations / Don't just take our word for it" section with
  the Better digestion / Value for money / Healthy weight / Kittens / Older cats tabs). The mouse page's own reviews
  (section 5) now carry the social proof. "How KatKin Works" is followed directly by "Ready to see the difference?".
- The quiz's PostHog events (`lp_quiz_option_selected`, `lp_quiz_submitted`) now report `page: "mouse-lp"`.
- **The signs quiz** sits straight after the mouse page's reviews, in its own wrapper `div.mouse-quiz` so it can be
  moved around the page independently.
- On the original page the quiz component also contained the "Maybe it's to do with their food..." block (heading,
  commercial-cat-food graphic, "That's not what carnivore cats need…"). That block is now its own section,
  `sections/FoodProblem.tsx`, directly after the quiz. So the two don't run together (both are `#F8F8F4`), a white
  band separates them: the quiz wrapper is `div.mouse-quiz bg-white pb-8 lg:pb-10` (32px / 40px), and FoodProblem
  sits on it as a card with a rounded top (`rounded-t-[12px] section-shadow-top`, no negative margin). The heading's
  `mt-12 md:mt-16` is removed; the quiz's mobile block ends with `pb-9 md:pb-11` and the FoodProblem mobile block
  starts with `pt-8 md:pt-10`.
- The quiz has a soft drop shadow underneath, so it reads as a card above that white band: its `section-shadow-top` is
  replaced by one `box-shadow` that keeps the same top shadow and adds `0 12px 24px -10px rgba(35,31,32,0.22)` below. FoodProblem keeps the deep bottom padding that leaves room for the KatKin difference chopping board. (See
  section 6 for its heading changes.)

---

## 2. Hero (above the fold)

### Proofreader's caret under "Second"
- **Before:** the `^` was attached to the handwritten note (`.mouse-hero-note:after`) and sat up by the top of "best".
- **After:** it's attached to the word "best" (`.mouse-best-word:before`) and sits just below the headline's baseline,
  in the gap between "world's" and "best", pointing up at "Second". Its size at each breakpoint is unchanged.

### Handwritten "Second" moved left
- `.mouse-hero-note` `left: -0.6em` → `-0.85em`.

### Cat and mouse now flank the sub-heading
- **Before:** the cat and mouse sat on a row of their own beneath "(First best has a tail). Squeak.", with empty space
  between them.
- **After:** the sub-heading and the drawings share one row. The text is centred and the drawings are pinned to the
  row's left and right edges.
- Markup: `p.mouse-hero-sub` and `div.mouse-chase` are now wrapped in a new `div.mouse-sub-row`, and `.mouse-chase` is
  absolutely positioned inside it.
- Spacing above and below the row (`.mouse-sub-row` margin):

  | | Above | Below |
  |---|---|---|
  | Phone | 18px | 46px |
  | Tablet | 20px | 62px |
  | Desktop | 26px | 72px |
  | Short desktop | 14px | 42px |

### Cat and mouse artwork
- **Phone:** new white-filled drawings ("Determined Cat Reaching Forward" and "Running Mouse with Protest Sign") replace
  `/lps/mouse-lp/pouncing-cat.png` and `/lps/mouse-lp/running-mouse-sign.png`. The cat still runs off the left edge of
  the screen. Sizes are unchanged: cat `clamp(100px, 27vw, 130px)` and mouse `clamp(115px, 30vw, 145px)` wide.
- **Tablet and up:** the full, uncropped line drawings are shown instead (the cropped ones looked cut off once the row
  stops reaching the screen edges at 700px). They're sized by height: 130px on tablet, 170px on desktop, 104px on short
  desktop. These files have an opaque white background, so they use `mix-blend-mode: multiply` to blend into the cream.
- Markup: the phone images keep the `mouse-chase-cat` / `mouse-chase-mouse` classes. The tablet-and-up images are new,
  `mouse-chase-cat-full` / `mouse-chase-mouse-full`. CSS shows one pair or the other at 700px.

### Copy: "natural diet" bar
- "KatKin: The next best thing to a natural diet:" → "KatKin: The next best thing to natural..."

---

## 3. Letter section ("Shhh…")

### Headline
- **Before:** "Shhh... I've taken over KatKin... / read this qwik before they / take it down..." (with two `<br>`s)
- **After:** "Shhh... I've taken over KatKin... read this kwik before they take it down..." (no line breaks, wraps naturally;
  "take it down..." is held together with non-breaking spaces so "down..." never sits alone on the last line)
- Styled like the page's other section headlines: it now uses the shared `section-heading` class (36 / 40 / 52px, line
  height 0.95, letter-spacing -0.02em) and is centred. Removed from `.mouse-letter-section > h2`: `font-size:
  clamp(34px, 9vw, 50px)`, `line-height: 1.04`, `letter-spacing: -0.035em` (it was left-aligned).
- Space under the headline (`.mouse-letter-section > h2` margin-bottom): 26px → 46px on phone, 66px from tablet up.
  This leaves room for the peeking mouse below, however the headline wraps.

### Mouse peeking over the letter
- **Before:** the running mouse with the "try katkin!" sign floated to the right of the headline. On phones its sign
  overlapped the word "they".
- **After:** a new "peeking mouse" sits on the letter card's top edge at the right, with its paw resting on the paper.
- Markup: the image (still `.mouse-letter-mouse`) moved from the section into `article.mouse-letter`, which is now
  `position: relative`.
- Phone: `top: -40px; right: 12px; width: 68px`. Tablet and up: `top: -60px; right: 28px; width: 102px`.

### Letter copy
| Before | After |
|---|---|
| Dear cat owner,<br>This is important. i need your help! *(one paragraph)* | Dear cat owner, *(own paragraph)*<br>This is important. **I** need your help! |
| Who am i? | Who am **I**? |
| For a very long time, i've been… | For a very long time, **I**'ve been… |
| …Didn't stand a chance. | …**No chance!** |
| No. We've been watching them. | No. **I've** been watching them. |
| …(i call them clever.) | …(**I** call them clever.) |
| Which is why i've hacked this page... | Which is why **I**'ve hacked this page... |
| P.s. nearly forgot... i've also hacked the coupon codes! | P.s. nearly forgot... **I**'ve also hacked the coupon codes! |
| Qwik... i can hear someone coming... | **Kwik**... **I** can hear someone coming... |

### Mouse paw-print bullets on the "100% real meat" list
- **Before:** one `<p class="mouse-letter-list">` with the eight lines separated by `<br>`s.
- **After:** a `<ul class="mouse-letter-list mouse-letter-paws">` with one `<li>` per line ("100% real meat", "0% filler",
  "Moisture", "Muscle", "Organs", "Everything", "In just the right proportions", "In made-to-measure trays"), with no full stops (the original ended six of them with one).
- Each item gets a mouse paw-print bullet (`.mouse-letter-paws li:before`, a background image), sized in `em` so it
  scales with the letter text. Bullets tilt -12° and +12° alternately, like a trail of footsteps. Bullets are
  `0.48em × 0.7em`. Items have `padding-left: 1.05em` and `0.22em` between them.
- The new `.mouse-letter .mouse-letter-paws` rules override the letter's existing `ul`/`li` styles (the `- ` dash
  prefix and the -12px top margin), so the "teeth / gut / kidneys" list above is unchanged.

### Footprint trail after "Bye!"
- **Before:** a row of five 🐾 emoji (`div.mouse-paw-trail`) below "Bye!", aligned right and slightly tilted.
- **After:** a trail of twelve mouse footprints sets off right after "Bye!" and walks right and slightly downward, with
  the last prints stepping off the bottom edge of the letter card.
- Markup: `<p>Bye!<span class="mouse-paw-trail"><img …></span></p>`. The span is a zero-size inline anchor at the end of
  "Bye!", and the image hangs off it (`position: absolute; top: -0.55em; left: 0.85em`).
- Trail width: 285px on phone, 420px from tablet up (height follows the image's 1451×563 ratio).
- The artwork is the full "Diagonal Mouse Footprint Trail" (all twelve prints), rotated 65° so it heads right with the
  toes pointing forward, on a transparent background.

### "my" crossed out in pencil
- **Before:** "For <u>my</u> your cat's sake." ("my" underlined).
- **After:** "my" is struck through with a diagonal pencil line, as if the mouse crossed it out.
- Markup: `<s className="mouse-pencil-strike">my</s>`. The line is an inline SVG on `.mouse-pencil-strike:after`.

### "Let it try KatKin." is now a link
- **Before:** underlined text, not clickable.
- **After:** `<a href="/sign-up/fresh" class="mouse-letter-inline-link">`. On click it calls the page's existing CTA
  handler (`handleCta("let_it_try")`), so it carries the query string into sign-up and fires PostHog `cta_click` with
  `location: "let_it_try"`.
- Coloured blue (`#0b57d0`) and underlined.

### In-letter "Try now with 20% off." link coloured blue
- `.mouse-letter-link` `color: inherit` → `#0b57d0` (its 2px underline follows the text colour).

---

## 4. After-letter CTA

### Pouncing cat removed
- The cat (`img.mouse-mid-cat`, `/lps/mouse-lp/pouncing-cat.png`) to the left of the after-letter "Try now with 20% off"
  button is gone, along with its `.mouse-mid-cat` CSS.

### Mouse pointing at the CTA
- New: a mouse peeks in from the right (the artwork mirrored with `transform: scaleX(-1)`) and points back at the
  bottom-right end of the after-letter "Try now with 20% off" button.
- It's an `<img class="mouse-cta-pointer">` inside that button (`.mouse-cta` is now `position: relative`), so it's
  positioned from the button's right edge, lifts with the button on hover, and clicking it triggers the CTA.
- On phones it runs off the right edge of the screen (clipped by `.mouse-page { overflow: hidden }`).

  | | top | right | width |
  |---|---|---|---|
  | Phone | 4px | -30px | 76px |
  | Tablet | -2px | -63px | 90px |
  | Desktop | 1px | -79px | 110px |
  | Short desktop | 0 | -56px | 80px |

- The artwork has a white body and a transparent surround, so where it overlaps the button it reads as a mouse in front
  of the button.

---

## 5. Reviews (below "P.s. Don't just believe me… Here's what owners that already feed KatKin say...")

### Highlighter on "P.s. Don't just believe me. I'm biased."
- The handwritten line is wrapped in `<mark class="mouse-highlight">`: a highlighter-pen stroke in brand chartreuse
  (`#d5e709`), built from layered `linear-gradient`s with ragged ends and slightly uneven ink, and
  `box-decoration-break: clone` so each wrapped line gets its own stroke. "I'm biased." is held together with a
  non-breaking space so phones wrap it as "P.s. Don't just believe me. / I'm biased.".

### Intro headline matches the page's other section headlines
- "Here's what owners that already feed KatKin say..." is no longer ALL CAPS and now uses the shared `section-heading`
  class (36 / 40 / 52px, line height 0.95, letter-spacing -0.02em). Removed from `.mouse-proof-intro h2`: `font-size:
  clamp(37px, 10vw, 56px)`, `line-height: 0.98`, `text-transform: uppercase`.

### Carousel replaced with four headed groups of reviews
- **Before:** a sand section with the "Real transformations" tag, "Don't just take our word for it" heading, "Hear from
  our community how we've helped with:" line, five category tabs (Better digestion / Value for money / Healthy weight /
  Kittens / Older cats) and, on phones, a one-at-a-time swipe carousel with arrows and dots.
- **After:** a white section with no tag, heading, lead-in line, tabs or carousel. All twelve reviews show, in four groups
  that follow the letter ("Some get sick. Some get lazy. Most get dull coats and stinky(!) poos."), each under a headline:
  **"No more stinky poos" / "More energy" / "Glossier coats" / "No more sickness"**.
  - Headlines: `font-greed font-bold section-heading-sm`, centred, and shown in quote marks (`"No more stinky poos"`),
    as if said by the owners below, matching the quote marks on each review.
  - Phone: cards stacked one under another, 16px apart; 40px between groups.
  - Desktop: three cards across per group, 24px apart; 56px between groups.
  - Review cards are sand (`#E0E0D1`) on the white section. The `.mouse-proof` wrapper is now `background: #fff`.
  - The section no longer has the rounded top and top shadow.
- Implementation: a new `components/ReviewGroups.tsx` renders the groups using the existing review card, now in its own
  file `components/TestimonialCard.tsx` with a `sand` option. The carousel component and the original review list are no
  longer used anywhere on the page.

### New review set, chosen for the letter's symptoms
- Data: `lib/symptom-testimonials.ts` (`symptomTestimonials`, grouped by `symptomCategories`).
- Sources: reviews already published on katkin.com (sensitive-stomach, senior, healthy, wet, dry, raw, why-fresh,
  grain-free, frozen pages) and the existing LP review sets (mouse-lp / try-fresh / kitten-lp).
- Quotes are verbatim. Where a review was long it's trimmed, marked with "…" (Lauren A., Erin & Frank, Fran), or cut
  after a complete sentence (Margaret R., Ruth). **Please have the trims signed off before launch.**
- Review titles are the customers' own, except Margaret R.'s: her title "Excellent product and service" is replaced
  with "Gained weight and so much happier" (drawn from her review). The green pill on each card is new copy.
- **No dates** on these cards (the card's date chip now only shows when a review has a date).
- **"Verified" chip** only on the three reviews that showed it on the live site (Lauren A., Fran, Danielle). The card
  now hides the chip when a review has `verified: false`.

| Group | Reviewer | Title | Photo |
|---|---|---|---|
| No more stinky poos | Sarah and KleoKatera | Giving a new lease of life | ⚠️ reused (`card/img-social-proof-older-2.png`) |
| No more stinky poos | Beth and George | A lifesaver for boy with IBD | ⚠️ reused (`card/img-social-proof-value-3.png`) |
| No more stinky poos | Susan | My senior cats are happy | ⚠️ reused (`card/img-social-proof-older-3.png`) |
| More energy | Lynne and Lily | Within weeks she transformed | ⚠️ reused (`card/img-social-proof-older-cat-bob.png`) |
| More energy | Lauren A. | More satisfied, less begging | Own (`img-social-proof-hungry-cat-3.png`) |
| More energy | Melissa and Charlie | The best cat food ever | ⚠️ reused (`card/img-social-proof-healthy-weight-3.png`) |
| Glossier coats | Dexy + Pickle | Food allergies | ⚠️ reused (`card/img-social-proof-healthy-weight-velvet.png`) |
| Glossier coats | Erin & Frank | Grumpy old senior cat to happy old chappy with silky smooth fur | ⚠️ reused (`card/img-social-proof-value-2.png`) |
| Glossier coats | Fran | 10/10 | Own (`img-social-proof-kitten-1.png`) |
| No more sickness | Margaret R. | Gained weight and so much happier | Own (`/lps/Hungry_Cat_LP/Assets/card/img-social-proof-standard-3.png`, from kitten-lp) |
| No more sickness | Danielle | Fuller for longer, no vomiting | Own (`img-social-proof-hungry-cat-2.png`) |
| No more sickness | Ruth | My cats love it, and so do their sensitive tummies | ⚠️ reused (`card/img-social-proof-healthy-weight-1.png`) |

> ⚠️ **Reused photos are test stand-ins.** Eight reviews have no photo of their own, so a cat photo from a different
> review is shown in its place (flagged `photoReused: true` in the data). Before going live, swap in the reviewers' own
> photos or drop the photo on those cards. None of the reused photos have before/after labels.

---

## 6. "Want to know why it works?" section (was "Maybe it's to do with their food...")

### Heading
- **Before:** `h4` "Maybe it's to do with their food...", `section-heading-sm`.
- **After:** `h2` on two lines, each a block `<span>`: "Want to know why it works?" / "Let's start with the problem...",
  on the `section-heading` class. The first line leads the hierarchy:
  - Lead line `text-[length:min(1.18em,8.4vw)]`: ~33px on a 390px phone, 47px tablet, 61px desktop.
  - Second line `text-[length:min(1em,6.6vw)]`: ~26px on a 390px phone, 40px tablet, 52px desktop.
  - The `vw` caps keep each line on a single line on phones (checked 360–430px wide). "it works?" and "the problem..." are
  each held together with a non-breaking space so phones don't strand a single word. The gap to the graphic is
  unchanged (`mb-6 md:mb-8` on phone/tablet, `mb-12` on desktop).
- File: `app/mouse-lp/sections/FoodProblem.tsx`.

---

## Assets

The new artwork is currently hosted on Vercel Blob. Copies of every file are in the code's `artwork/` folder. We'd
suggest copying them into the app's `public/mouse-lp/` (served at `/lps/mouse-lp/`), then setting `BLOB` in
`lib/blob-assets.ts` to `"/lps/mouse-lp"` and the paw-print URL in `mouse-lp.css` to `/lps/mouse-lp/mouse-paw-print.png`:
katkin.com's Content-Security-Policy (report-only today) doesn't list
the Blob domain under `img-src`, so the images would break if that policy is ever enforced.

Each file is sized to about 3× its largest display width (sharp on high-density phones) and palette-compressed PNG with
transparency: about 109 KB of artwork on a phone visit and 74 KB on desktop.

| Used for | File | Size (px) | KB |
|---|---|---|---|
| Hero cat, phone | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/cat-reaching-mobile-v2.png | 390×399 | 42 |
| Hero mouse, phone | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/mouse-sign-mobile-v2.png | 435×405 | 27 |
| Hero cat, tablet + | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/cat-pouncing-full-v2.png | 600×398 | 17 |
| Hero mouse, tablet + | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/mouse-sign-full-v2.png | 420×416 | 17 |
| Mouse pointing at CTA | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/mouse-pointing-at-cta-cut-v2.png | 330×292 | 14 |
| Mouse peeking over the letter | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/mouse-peeking-v2.png | 320×209 | 18 |
| Paw-print bullet (referenced from `mouse-lp.css`) | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/mouse-paw-print.png | 51×73 | 2 |
| Footprint trail after "Bye!" | https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp/mouse-paw-trail-12-v2.png | 870×338 | 6 |

`/lps/mouse-lp/running-mouse-sign.png` and `/lps/mouse-lp/pouncing-cat.png` are no longer used anywhere on the page.
