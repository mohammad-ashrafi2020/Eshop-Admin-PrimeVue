import type { ProductFilterItem } from "~/models/products/ProductFilterItem";
import type { FilterResult } from "~/models/Filterresult";
import type { ProductFilterParams } from "~/models/products/ProductFilterItem";
import { CustomFetch } from "~/utils/CustomFetch";

export const GetProductsByFilter = (filterparams: ProductFilterParams) => {
  return CustomFetch<FilterResult<ProductFilterItem>>("/product", {
    method: "GET",
    query: filterparams,
  });
};
