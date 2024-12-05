import { BASE_URL } from "./EnvironmentVariables";

export const GetBannerImageUrl = (imageName: string) => {
  return `${BASE_URL}/images/banners/${imageName}`;
};
