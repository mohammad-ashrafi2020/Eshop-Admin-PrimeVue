import type { SeoData } from "../SeoData";

export interface Category {
  title: string;
  slug: string;
  imageName: string;
  seoData: SeoData;
  childs: Category[];
  creationDate: Date;
  id: number;
}
