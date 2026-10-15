import { Testimonial, TestimonialCategoryOption } from "@/lib/testimonials";

// Reviews for the mouse letter's symptoms (stinky poos, low energy, dull coats, sickness), gathered from katkin.com
// and KatKin's other landing pages. Quotes are verbatim; "…" marks a trim. No dates.
// photoReused: the review has no photo of its own, so a cat photo from another review stands in for the test.
// verified: only set where the original card on the live site showed "Verified".

export const symptomCategories: TestimonialCategoryOption[] = [
  { id: "stink", label: "No more stinky poos" },
  { id: "energy", label: "More energy" },
  { id: "coat", label: "Glossier coats" },
  { id: "sick", label: "No more sickness" },
];

const GPA = "/lps/General_Page_Assets";

const reviews: Testimonial[] = [
  // Stinky poos
  {
    id: 101,
    categories: ["stink"],
    image: `${GPA}/card/img-social-proof-older-2.png`,
    photoReused: true,
    pill: "No more stinky poo",
    title: "Giving a new lease of life",
    content:
      "Big upside: no more stinky poo. Biggest downside: geriatric cat doing zoomies and jumping on the bed at 3am.",
    authorInitial: "S",
    authorName: "Sarah and KleoKatera",
    authorBgColor: "#fdf3fd",
  },
  {
    id: 102,
    categories: ["stink"],
    image: `${GPA}/card/img-social-proof-value-3.png`,
    photoReused: true,
    pill: "Firm, odourless stools",
    title: "A lifesaver for boy with IBD",
    content:
      "His stools are firm and practically odourless, his coat is shiny, much more energy. I believe that Katkin has been a lifesaver.",
    authorInitial: "B",
    authorName: "Beth and George",
    authorBgColor: "#fff3e6",
  },
  {
    id: 103,
    categories: ["stink"],
    image: `${GPA}/card/img-social-proof-older-3.png`,
    photoReused: true,
    pill: "Happy, healthy seniors",
    title: "My senior cats are happy",
    content:
      "My senior cats love this food. No more stinky cat poo or unfortunate incidents at either end. Quality food. Healthy cats. Happy human. Worth every penny.",
    authorInitial: "S",
    authorName: "Susan",
    authorBgColor: "#ecf7fc",
  },

  // Low energy
  {
    id: 111,
    categories: ["energy"],
    image: `${GPA}/card/img-social-proof-older-cat-bob.png`,
    photoReused: true,
    pill: "Muscle + energy at 20",
    title: "Within weeks she transformed",
    content:
      "She was vomiting and slept all day. On KatKin she transformed, gained muscle and energy, and just had her 20th birthday.",
    authorInitial: "L",
    authorName: "Lynne and Lily",
    authorBgColor: "#fff3e6",
  },
  {
    id: 112,
    categories: ["energy"],
    image: `${GPA}/img-social-proof-hungry-cat-3.png`,
    pill: "More energy",
    title: "More satisfied, less begging",
    content:
      "The food keeps my really hungry cat full. … He has more energy but also seems more chilled as isn't always begging, his coat is glossier and his litter doesn't smell.",
    authorInitial: "L",
    authorName: "Lauren A.",
    authorBgColor: "#ecf7fc",
    verified: true,
  },
  {
    id: 113,
    categories: ["energy"],
    image: `${GPA}/card/img-social-proof-healthy-weight-3.png`,
    photoReused: true,
    pill: "Livelier",
    title: "The best cat food ever",
    content:
      "He is livelier, looks healthier, his fur is better. I can’t believe the difference. 100% fresh cooked meat and he loves it.",
    authorInitial: "M",
    authorName: "Melissa and Charlie",
    authorBgColor: "#fdf3fd",
  },

  // Dull coats
  {
    id: 121,
    categories: ["coat"],
    image: `${GPA}/card/img-social-proof-healthy-weight-velvet.png`,
    photoReused: true,
    pill: "Fur grew back",
    title: "Food allergies",
    content:
      "Her fur grew back to the lovely coat she had before she had allergies, and overall she’s much happier and healthier.",
    authorInitial: "D",
    authorName: "Dexy + Pickle",
    authorBgColor: "#ecf7fc",
  },
  {
    id: 122,
    categories: ["coat"],
    image: `${GPA}/card/img-social-proof-value-2.png`,
    photoReused: true,
    pill: "Silky smooth fur",
    title: "Grumpy old senior cat to happy old chappy with silky smooth fur",
    content:
      "He’s gone from barely eating any other brands and leaving most the food, now there isn’t ever a speck of food left in his bowls! … His fur is beautiful and silky soft again. … KatKin is the best!",
    authorInitial: "E",
    authorName: "Erin & Frank",
    authorBgColor: "#fff3e6",
  },
  {
    id: 123,
    categories: ["coat"],
    image: `${GPA}/img-social-proof-kitten-1.png`,
    pill: "Glossier coat",
    title: "10/10",
    content:
      "My little British Shorthair kitten is enjoying KatKin SO MUCH! … In just a week's time, his coat looks like I have used moisturiser on him, where before it was matted.",
    authorInitial: "F",
    authorName: "Fran",
    authorBgColor: "#fdf3fd",
    verified: true,
  },

  // Sickness
  {
    id: 131,
    categories: ["sick"],
    image: "/lps/Hungry_Cat_LP/Assets/card/img-social-proof-standard-3.png",
    pill: "No more diarrhoea",
    title: "Gained weight and so much happier",
    content:
      "The difference in our cat is remarkable, no more diarrhoea or vomiting. He's gained weight and is so much happier.",
    authorInitial: "M",
    authorName: "Margaret R.",
    authorBgColor: "#ecf7fc",
  },
  {
    id: 132,
    categories: ["sick"],
    image: `${GPA}/img-social-proof-hungry-cat-2.png`,
    pill: "No more vomiting",
    title: "Fuller for longer, no vomiting",
    content:
      "Omar used to do an Olympic sprint to his feeder to inhale every bit of his kibble. After countless vet visits, I put him on special gastro food but it didn't work. Then I switched him to KatKin and everything changed! He's fuller for longer with all the protein, running around outside all day, no more vomiting, and there's much less cat hair stuck to my clothes.",
    authorInitial: "D",
    authorName: "Danielle",
    authorBgColor: "#fdf3fd",
    verified: true,
  },
  {
    id: 133,
    categories: ["sick"],
    image: `${GPA}/card/img-social-proof-healthy-weight-1.png`,
    photoReused: true,
    pill: "Sensitive tummies sorted",
    title: "My cats love it, and so do their sensitive tummies",
    content:
      "My Maine Coons both has sensitive tummys and upset stomachs quite regularly before switching to katkin but are now all better. Couldn't be happier with the food, there's a great range of flavours.",
    authorInitial: "R",
    authorName: "Ruth",
    authorBgColor: "#fff3e6",
  },
];

// Unless a review was shown as verified on the live site, don't label it so.
export const symptomTestimonials: Testimonial[] = reviews.map((r) => ({ verified: false, ...r }));
