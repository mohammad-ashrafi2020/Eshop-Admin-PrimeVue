import { AppStatusCode, type ApiResponse } from "~/models/ApiResponse";
import type { FetchConfig } from "~/models/config/fetchConfig";
import type { FetchError } from "~/models/FetchError";
import { useToast } from "primevue/usetoast";
import { useAccountStore } from "~/stores/account.store";
import { BASE_URL } from "./EnvironmentVariables";

export function CustomFetch<T>(
  url: string,
  config: FetchConfig | undefined = {}
): Promise<ApiResponse<T>> {
  var newConfig: FetchConfig = {
    baseURL: BASE_URL + "/api",
    ...config,
    retry: 0,
  };
  const accountStore = useAccountStore();
  if (accountStore.isLogin) {
    if (!newConfig.headers) {
      newConfig.headers = {};
    }
    //@ts-ignore
    newConfig.headers["authorization"] = `Bearer ${accountStore.getToken!}`;
  }
  const shoError = (data: ApiResponse<any>) => {
    if (process.client) {
      if (data.metaData.appStatusCode == AppStatusCode.NotFound) {
        accountStore.setAlertOutsideOfScriptSetup({
          severity: "warn",
          summary: data.metaData.message,
        });
      } else {
        accountStore.setAlertOutsideOfScriptSetup({
          severity: "error",
          summary: data.metaData.message,
        });
      }
    }
  };
  //@ts-ignore
  return $fetch<ApiResponse<T>>(url, newConfig)
    .then((response) => {
      if (response.isSuccess == false) {
        shoError(response);
      }
      return response;
    })
    .catch((e: FetchError) => {
      var customResponse = {
        data: undefined,
        isSuccess: false,
        metaData: {
          appStatusCode:
            e.response._data?.metaData?.appStatusCode ??
            AppStatusCode.ServerError,
          message: e.response._data?.metaData?.message ?? "خطای سمت سرور",
        },
      } as ApiResponse<undefined>;
      switch (e.response.status) {
        case 400: {
          customResponse.metaData.message =
            e.response._data?.metaData?.message ?? "اطلاعات نامعتبر است";
          break;
        }
        case 401: {
          customResponse.metaData.message =
            e.response._data?.metaData?.message ?? "دسترسی غیرمجاز";
          break;
        }
        case 404: {
          customResponse.metaData.message =
            e.response._data?.metaData?.message ?? "اطلاعات نامعتبر است";
          break;
        }
      }
      shoError(customResponse);
      return customResponse;
    });
}
