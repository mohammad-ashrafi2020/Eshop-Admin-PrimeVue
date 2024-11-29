export interface Banner {
  link: string;
  imageName: string;
  position: BannerPosition;
  id: number;
  creationDate: Date;
}
export enum BannerPosition {
  زیر_اسلایدر = "0",
  سمت_چپ_اسلایدر = "1",
  بالای_اسلایدر = "2",
  سمت_راست_شگفت_انگیز = "3",
  وسط_صفحه = "4",
}
