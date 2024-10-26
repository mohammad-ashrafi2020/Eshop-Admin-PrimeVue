import type { ApiResponse } from "~/models/ApiResponse";
import type { FetchConfig } from "~/models/config/fetchConfig";

export function CustomFetch<T>(
  url: string,
  config: FetchConfig | undefined = {}
): Promise<ApiResponse<T>> {
  var newConfig: FetchConfig = {
    baseURL: "https://shop-api.codeyad-project.ir/api",
    ...config,
    retry: 0,
  };
  return $fetch<ApiResponse<T>>(url, newConfig);
}
