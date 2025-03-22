import type { SeoData } from "../SeoData";

export interface CreateProductCommand {
  title: string;
  imageFile: any;
  description: string;
  categoryId: string;
  subCategoryId: string;
  slug: string;
  seoData: SeoData;
  specifications: string;
}
