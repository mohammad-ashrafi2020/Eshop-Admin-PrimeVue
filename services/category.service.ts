import type { Category } from "~/models/categories/Category";
import type { CreateCategoryCommand } from "~/models/categories/CreateCategoryCommand";
import { CustomFetch } from "~/utils/CustomFetch";

export const GetCategories = () => {
  return CustomFetch<Category[]>("/Category");
};
export const DeleteCategory = (categoryId: number) => {
  return CustomFetch("/Category/" + categoryId, {
    method: "DELETE",
  });
};
export const CreateCategory = (command: CreateCategoryCommand) => {
  var data = new FormData();

  data.append("Slug", command.slug);
  data.append("Title", command.title);
  data.append("ImageFile", command.imageFile);

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

  return CustomFetch("/Category", {
    method: "POST",
    body: data,
  });
};
export const AddChildCategory = (command: CreateCategoryCommand) => {
  var data = new FormData();

  data.append("ParentId", command.parentId?.toString() ?? "0");
  data.append("Slug", command.slug);
  data.append("Title", command.title);
  data.append("ImageFile", command.imageFile);

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

  return CustomFetch("/Category/AddChild", {
    method: "POST",
    body: data,
  });
};
