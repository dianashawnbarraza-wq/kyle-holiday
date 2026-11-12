export type ShopOrderItem = {
  name: string;
  description: string | null;
  quantity: number;
  amount: number;
};

export type ShopOrderAddress = {
  name: string | null;
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
};

export type ShopOrder = {
  id: string;
  created: number;
  amountTotal: number;
  email: string | null;
  name: string | null;
  phone: string | null;
  fulfillment: string | null;
  shipped: boolean;
  weight: string | null;
  shipping: ShopOrderAddress | null;
  items: ShopOrderItem[];
};
