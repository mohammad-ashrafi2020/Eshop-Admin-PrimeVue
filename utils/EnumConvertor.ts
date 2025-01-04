import { BannerPosition } from "~/models/banners/Banner";
import type { UserRecommendedStatus } from "~/models/comments/Comment";

export const GetBannerPositonName = (position: BannerPosition) => {
  switch (position.toString()) {
    case BannerPosition.بالای_اسلایدر:
      return "بالای اسلایدر";
    case BannerPosition.زیر_اسلایدر:
      return "زیر اسلایدر";
    case BannerPosition.سمت_راست_شگفت_انگیز:
      return "سمت راست شگفت انگیز";
    case BannerPosition.سمت_چپ_اسلایدر:
      return "سمت چپ اسلایدر";
    case BannerPosition.وسط_صفحه:
      return "وسط صفحه";
    default:
      return "";
  }
};

export const GetUserRecommendedStatusName = (
  enumData: UserRecommendedStatus
) => {
  switch (enumData) {
    case 0:
      return "پیشنهاد میکنم";
    case 1:
      return "پیشنهاد نمی کنم";
    case 2:
      return "مطمئن نیستم";
    default:
      return "";
  }
};
