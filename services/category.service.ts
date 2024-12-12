import type { Category } from "~/models/categories/Category";
import { CustomFetch } from "~/utils/CustomFetch";

export const GetCategories = () => {
  return CustomFetch<Category[]>("/Category");
};
