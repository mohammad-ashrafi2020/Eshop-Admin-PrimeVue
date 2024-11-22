import type { BannerPosition } from "./Banner";

export interface CreateBannerCommand {
  link: string;
  position: BannerPosition;
  imageFile: any;
}
