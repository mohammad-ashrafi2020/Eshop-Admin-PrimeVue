import type { Banner } from "~/models/banners/Banner";
import { CustomFetch } from "~/utils/CustomFetch";

export const GetBanners = () => {
   
  return CustomFetch<Banner[]>("/Banner");
};
