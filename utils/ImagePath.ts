import { BASE_URL } from "./EnvironmentVariables";

export const GetBannerImageUrl = (imageName: string) => {
  return `${BASE_URL}/images/banners/${imageName}`;
};

export const GetCategoryImageUrl = (imageName: string) => {
  return `${BASE_URL}/images/categories/${imageName}`;
};
export const GetProductImageUrl = (imageName: string) => {
  return `${BASE_URL}/images/products/${imageName}`;
};