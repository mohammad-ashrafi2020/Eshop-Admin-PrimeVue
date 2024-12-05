import type { BannerPosition } from "./Banner";

export interface CreateBannerCommand {
  link: string;
  position: BannerPosition;
  imageFile: any;
}
export interface EditBannerCommand {
  id: number | string;
  link: string;
  position: BannerPosition;
  imageFile: any | undefined;
}
