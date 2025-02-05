import type { FilterResult } from "~/models/Filterresult";
import type { OrderData } from "~/models/orders/orderData";
import type {
  OrderFilterParams,
  OrderListData,
} from "~/models/orders/orderListData";
import { CustomFetch } from "~/utils/CustomFetch";

export const getOrders = (filterParams: OrderFilterParams) => {
  return CustomFetch<FilterResult<OrderListData>>("/order", {
    query: filterParams,
  });
};
export const getOrderById = (id: number) => {
  return CustomFetch<OrderData>("/order/" + id);
};
