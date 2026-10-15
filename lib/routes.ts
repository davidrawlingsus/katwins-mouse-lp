export const SIGN_UP_PATH = "/sign-up/fresh";

export function signUpWithDiscount(code: string) {
  return `${SIGN_UP_PATH}?discount_code=${code}`;
}

// The try-fresh-cat-food sections send people straight into sign-up with the £20 trial code.
export const TRIAL_OFFER_PATH = signUpWithDiscount("FEAST20");
