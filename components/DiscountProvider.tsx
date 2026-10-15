"use client";

import { createContext, Suspense, useContext, useEffect, useMemo, useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { api, Discount } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { LoadingState } from "@/lib/loading-state";

declare global {
  interface Window {
    KKActiveDiscount?: Discount;
  }
}

export const ACTIVE_DISCOUNT_EVENT = "kk:active-discount";
const DISCOUNT_PARAM = "discount_code";

type DiscountCopy = { tag: string; cta: string };
type DiscountContextValue = { copy: DiscountCopy; state: LoadingState };

const EMPTY_COPY: DiscountCopy = { tag: "", cta: "" };
let activeDiscount: Discount | null = null;

export function getActiveDiscount() {
  return window.KKActiveDiscount ? window.KKActiveDiscount : activeDiscount;
}

function copyFor(discount?: Discount): DiscountCopy {
  if (!discount) return EMPTY_COPY;
  const amount = discount.amount;
  if (discount.type === "PERCENTAGE") return { tag: `${amount}% off`, cta: `Try now with ${amount}% off` };
  if (discount.type === "FIXED_AMOUNT") return { tag: `£${amount} off`, cta: `Try now with £${amount} off` };
  return { tag: `Try for £${amount}`, cta: `Try now for £${amount}` };
}

const DiscountContext = createContext<DiscountContextValue | undefined>(undefined);

// useSearchParams lives in its own Suspense boundary so the page still renders on the server.
function SearchParamsListener({ onSetSearchParams }: { onSetSearchParams: (p: ReadonlyURLSearchParams) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onSetSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return null;
}

export function DiscountProvider({
  children,
  defaultDiscount = "FRESH20",
}: {
  children: React.ReactNode;
  defaultDiscount?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<ReadonlyURLSearchParams>();

  const code = useMemo(
    () => searchParams?.get(DISCOUNT_PARAM)?.trim() || defaultDiscount,
    [searchParams, defaultDiscount],
  );

  const { data, state } = useFetch((signal) => api().discounts().findByCode(code, signal), {
    refreshOn: [code],
    onFallBackFn: (signal) => api().discounts().findByCode(defaultDiscount, signal),
    // An invalid code is dropped from the URL so it isn't carried into sign-up.
    onError: () => {
      const params = new URLSearchParams(searchParams?.toString());
      params.delete(DISCOUNT_PARAM);
      router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
    },
  });

  const copy = useMemo(() => copyFor(data?.discount), [data]);

  useEffect(() => {
    if (!data?.discount) return;
    const discount = data.discount;
    activeDiscount = discount;
    window.KKActiveDiscount = discount;
    window.dispatchEvent(new CustomEvent(ACTIVE_DISCOUNT_EVENT, { detail: discount }));
    return () => {
      if (activeDiscount !== discount) return;
      activeDiscount = null;
      if (window.KKActiveDiscount === discount) delete window.KKActiveDiscount;
      window.dispatchEvent(new CustomEvent(ACTIVE_DISCOUNT_EVENT, { detail: null }));
    };
  }, [data]);

  return (
    <DiscountContext.Provider value={{ copy, state }}>
      <Suspense>
        <SearchParamsListener onSetSearchParams={setSearchParams} />
      </Suspense>
      {children}
    </DiscountContext.Provider>
  );
}

export function useDiscountContext() {
  const context = useContext(DiscountContext);
  if (context === undefined) throw new Error("useDiscountContext must be used within a DiscountProvider");
  return context;
}
