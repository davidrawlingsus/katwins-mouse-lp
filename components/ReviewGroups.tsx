import { TestimonialCard } from "@/components/TestimonialCard";
import { Testimonial, TestimonialCategoryOption } from "@/lib/testimonials";

type ReviewGroupsProps = {
  items: Testimonial[];
  categories: TestimonialCategoryOption[];
};

// Every review on show, grouped under a headline per category: stacked on phones, three across on desktop.
// White section with sand cards.
export default function ReviewGroups({ items, categories }: ReviewGroupsProps) {
  return (
    <div className="bg-white px-5 pt-8 pb-12 lg:px-12 lg:pt-10 lg:pb-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10 lg:gap-14">
        {categories.map((category) => (
          <section key={category.id}>
            <h3 className="font-greed font-bold text-[#231f20] section-heading-sm text-center mb-4 lg:mb-6">
              &quot;{category.label}&quot;
            </h3>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
              {items
                .filter((t) => t.categories.includes(category.id))
                .map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} sand />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
