"use client";

import { DependencyList, useEffect, useRef, useState } from "react";
import { LoadingState } from "@/lib/loading-state";

type Options<T> = {
  refreshOn?: DependencyList;
  onError?: () => void;
  onFallBackFn?: (signal: AbortSignal) => Promise<T>;
};

const isAbort = (error: unknown) => {
  const name = (error as { name?: string })?.name;
  return name === "AbortError" || name === "CanceledError";
};

export function useFetch<T>(fetchFn: (signal: AbortSignal) => Promise<T>, options?: Options<T>) {
  const [data, setData] = useState<T>();
  const [state, setState] = useState(LoadingState.LOADING);
  const controllerRef = useRef<AbortController | null>(null);

  const refresh = async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const { signal } = controller;
    setState(LoadingState.PROCESSING);

    try {
      setData(await fetchFn(signal));
      setState(LoadingState.READY);
    } catch (error) {
      if (isAbort(error)) return;
      console.error("Error fetching data", error);
      options?.onError?.();
      if (!options?.onFallBackFn) return;
      try {
        console.log("Attempting to fetch fallback data");
        setData(await options.onFallBackFn(signal));
        setState(LoadingState.READY);
      } catch (fallbackError) {
        if (isAbort(fallbackError)) return;
        console.error("Error fetching fallback data", fallbackError);
        setState(LoadingState.ERROR);
      }
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, options?.refreshOn ?? []);

  return { state, data, refresh };
}
