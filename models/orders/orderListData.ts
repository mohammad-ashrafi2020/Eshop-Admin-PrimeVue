import type { BaseFilterParams } from "../BaseFilterParams";

export interface OrderListData {
  id: number;
  creationDate: string;
  userId: number;
  userFullName: string;
  status: OrderStatus;
  shire: string;
  city: string;
  shippingType: string;
  totalPrice: number;
  totalItemCount: number;
}
export interface OrderFilterParams extends BaseFilterParams {
  userId: number | undefined;
  startDate: string | Date | undefined;
  endDate: string | Date | undefined;
  status: OrderStatus | undefined;
}
export enum OrderStatus {
  Pending,
  Finally,
  Shipping,
  Rejected,
}
