import type { ProductFilterItem } from "~/models/products/ProductFilterItem";
import type { FilterResult } from "~/models/Filterresult";
import type { ProductFilterParams } from "~/models/products/ProductFilterItem";
import { CustomFetch } from "~/utils/CustomFetch";
import type { CreateProductCommand } from "~/models/products/CreateProductCommand";

export const GetProductsByFilter = (filterparams: ProductFilterParams) => {
  return CustomFetch<FilterResult<ProductFilterItem>>("/product", {
    method: "GET",
    query: filterparams,
  });
};

export const CreateProduct = (command: CreateProductCommand) => {
  var data = new FormData();
  data.append("Title", command.title);
  data.append("ImageFile", command.imageFile);
  data.append("Description", command.description);
  data.append("CategoryId", command.categoryId.toString());
  data.append("SubCategoryId", command.subCategoryId.toString());
  data.append("Slug", command.slug);
  if (command.seoData.metaTitle) {
    data.append("SeoData.MetaTitle", command.seoData.metaTitle);
  }
  if (command.seoData.canonical) {
    data.append("SeoData.Canonical", command.seoData.canonical);
  }
  if (command.seoData.metaKeyWords) {
    data.append("SeoData.MetaKeyWords", command.seoData.metaKeyWords);
  }
  if (command.seoData.metaDescription) {
    data.append("SeoData.MetaDescription", command.seoData.metaDescription);
  }
  if (command.seoData.indexPage) {
    data.append("SeoData.IndexPage", command.seoData.indexPage.toString());
  }
  data.append("Specifications", command.specifications);
  return CustomFetch("/product", {
    method: "POST",
    body: data,
  });
};
