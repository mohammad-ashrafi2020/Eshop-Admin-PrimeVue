import { BASE_URL } from "./EnvironmentVariables";

export const BannerImageUrl = (imageName: string) => {
  return `${BASE_URL}/images/banners/${imageName}`;
};
