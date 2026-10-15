export type Testimonial = {
  id: number;
  categories: string[];
  image: string;
  pill: string;
  title: string;
  content: string;
  authorInitial: string;
  authorName: string;
  authorBgColor: string;
  date?: string; // the date chip only shows when set
  verified?: boolean; // the "Verified" chip shows unless this is false
  photoReused?: boolean; // the photo belongs to a different review (stand-in for testing)
};

export type TestimonialCategoryOption = { id: string; label: string };
