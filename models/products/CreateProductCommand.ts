import type { SeoData } from "../SeoData";

export interface CreateProductCommand {
  title: string;
  imageFile: any;
  description: string;
  categoryId: string;
  subCategoryId: string;
  secondarySubCategoryId: string | undefined;
  slug: string;
  seoData: SeoData;
  specifications: string;
}
