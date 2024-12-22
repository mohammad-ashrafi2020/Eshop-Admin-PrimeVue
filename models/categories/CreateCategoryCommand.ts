import type { SeoData } from "../SeoData";

export interface CreateCategoryCommand {
  parentId: number | undefined;
  slug: string;
  title: string;
  imageFile: any | undefined;
  seoData: SeoData;
}