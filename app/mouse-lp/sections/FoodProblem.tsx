// "Want to know why it works? Let's start with the problem...": what's really in commercial cat food, then the hand-off to KatKin.
// The deep bottom padding leaves room for the chopping board that hangs down from the KatKin difference section below.
export default function FoodProblem() {
  return (
    <div className="bg-[#F8F8F4] rounded-t-[12px] overflow-hidden section-shadow-top relative z-1">
      <div className="lg:hidden px-5 md:px-8 pt-8 md:pt-10 pb-[160px] md:pb-[180px]">
        <h2 className="font-greed text-[#231f20] font-bold text-center mb-6 md:mb-8 section-heading">
          <span className="block text-[length:min(1.18em,8.4vw)]">Want to know why it&nbsp;works?</span>
          <span className="block text-[length:min(1em,6.6vw)]">Let&apos;s start with the&nbsp;problem...</span>
        </h2>
        <div className="mb-8 md:mb-12 relative max-w-2xl mx-auto">
          <div className="absolute -left-12 md:-left-16 top-1/2 transform -translate-y-1/2 z-10">
            <img
              src="/lps/General_Page_Assets/cat-peeking.png"
              alt="Cat peeking"
              className="object-contain w-20 h-20 md:w-24 md:h-24"
            />
          </div>
          <img
            src="/lps/General_Page_Assets/img-problem-graphic-mobile.png"
            alt="What's really in commercial cat food"
            className="w-full rounded-sm"
          />
        </div>
        <p className="font-greed text-[#231f20] font-bold text-center mb-2 md:mb-3 section-subheading">
          That&apos;s not what carnivore cats need to feel their best.
        </p>
        <p className="font-scto text-[#231f20] text-center body-lg">
          Cats need essential nutrients from real meat to thrive. That&apos;s where KatKin comes in 👇
        </p>
      </div>
      <div className="hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-12 xl:px-16 pt-16 pb-[220px]">
          <h2 className="font-greed text-[#231f20] font-bold text-center mb-12 section-heading">
            <span className="block text-[length:min(1.18em,8.4vw)]">Want to know why it&nbsp;works?</span>
            <span className="block text-[length:min(1em,6.6vw)]">Let&apos;s start with the&nbsp;problem...</span>
          </h2>
          <div className="max-w-3xl mx-auto mb-12">
            <img
              src="/lps/General_Page_Assets/problem-section-graphic.png"
              alt="What's really in commercial cat food"
              className="w-full rounded-t-[4px]"
            />
            <div className="w-full bg-[#E8F0F6] rounded-b-[4px] p-6 flex items-start gap-3">
              <div className="flex-shrink-0 w-20 h-20">
                <img
                  src="/lps/General_Page_Assets/icon-cat-announcement.png"
                  alt="Cat with megaphone"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-greed text-[#231f20] font-bold mb-3 section-subheading">
                  That&apos;s not what carnivore cats need to feel their best.
                </p>
                <p className="font-scto text-[#231f20] body-lg">
                  Cats need essential nutrients from real meat to thrive. That&apos;s where KatKin comes in 👇
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
