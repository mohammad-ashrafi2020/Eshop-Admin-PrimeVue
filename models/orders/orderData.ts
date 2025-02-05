import type { OrderStatus } from "./orderListData";

export interface OrderData {
  id: number;
  creationDate: string;
  userId: number;
  userFullName: string;
  status: OrderStatus;
  discount: Discount;
  address: Address;
  shippingMethod: ShippingMethod;
  items: OrderItem[];
  lastUpdate: string;
  totalPrice: number;
}

export interface Discount {
  discountTitle: string;
  discountAmount: number;
}

export interface Address {
  id: number;
  creationDate: string;
  orderId: number;
  shire: string;
  city: string;
  postalCode: string;
  postalAddress: string;
  phoneNumber: string;
  name: string;
  family: string;
  nationalCode: string;
}

export interface ShippingMethod {
  shippingType: string;
  shippingCost: number;
}

export interface OrderItem {
  id: number;
  creationDate: string;
  productTitle: string;
  productSlug: string;
  productImageName: string;
  shopName: string;
  orderId: number;
  inventoryId: number;
  count: number;
  price: number;
  totalPrice: number;
}
