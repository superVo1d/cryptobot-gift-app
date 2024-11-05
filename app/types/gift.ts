export type CurrencyType = "TON" | "USDT";

export type GiftType = "1" | "2" | "3" | "4";

export interface IGift {
  id: string;
  name: string;
  type: GiftType;
  price: number;
  currency: CurrencyType;
  from: string;
  to: string;
}
