import type { FilterResult } from "~/models/Filterresult";
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
