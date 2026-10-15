import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "The world's second-best food for cats | KatKin",
  description: "Fresh cat food made with 100% real meat, matched to the nutritional needs of your cat.",
  robots: { index: false, follow: false },
  icons: { icon: "/lps/Hungry_Cat_LP/Assets/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#f2f4e9",
};

export default function MouseLpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
