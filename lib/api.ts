import axios from "axios";

const instance = axios.create();

const http = {
  instance,
  get: <T>(url: string, config?: Parameters<typeof instance.get>[1]) => instance.get<T>(url, config),
  post: <T>(url: string, data?: unknown, config?: Parameters<typeof instance.post>[2]) =>
    instance.post<T>(url, data, config),
};

export type Discount = {
  id: number;
  code: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT" | string;
  amount: string;
};

export type DiscountResponse = { success: boolean; discount?: Discount };

const discounts = () => ({
  findByCode: async (code: string, signal?: AbortSignal) =>
    (
      await http.post<DiscountResponse>(
        "https://discount.prd.ankn.io/codes/validate-discount-code",
        { code },
        { signal },
      )
    ).data,
});

export const api = () => ({ discounts });
