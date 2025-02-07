import type { SeoData } from "../SeoData";

export interface CreateProductCommand {
  title: string;
  imageFile: any;
  description: string;
  categoryId: number;
  subCategoryId: number;
  secondarySubCategoryId: number;
  slug: string;
  seoData: SeoData;
  specifications: string;
}
