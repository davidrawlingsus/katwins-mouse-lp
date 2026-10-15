import clsx from "clsx";
import { LoadingState } from "@/lib/loading-state";

// Fades discount-dependent copy in once the code has been validated.
export function DiscountCopy({ copy, state }: { copy: string; state: LoadingState }) {
  return (
    <span
      className={clsx(
        "transition-opacity ease-in-out duration-300",
        state === LoadingState.READY ? "opacity-100" : "opacity-0",
      )}
    >
      {copy || <>&nbsp;</>}
    </span>
  );
}
