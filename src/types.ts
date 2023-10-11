export interface CartItem {
  id: number;
  count: number;
  img: string;
  name: string;
  price: string;
}

export type DeliveryType = 1 | 2 | 3 | 4;

export interface Cart {
  id: number;
  title: string;
  photo: string;
  items: CartItem[];
  itemsCount: number;
  totalPrice: string;
  deliveryTypes?: DeliveryType[];
}

export type CartItemAction = { cartId: number; itemId: number };
