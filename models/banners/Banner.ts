export interface Banner {
  link: string;
  imageName: string;
  position: BannerPosition;
  id: number;
  creationDate: Date;
}
export enum BannerPosition {
  زیر_اسلایدر,
  سمت_چپ_اسلایدر,
  بالای_اسلایدر,
  سمت_راست_شگفت_انگیز,
  وسط_صفحه,
}
