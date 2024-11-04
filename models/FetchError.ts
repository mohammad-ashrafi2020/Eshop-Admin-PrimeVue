import type { ApiResponse } from "./ApiResponse";

export interface FetchError {
  response: {
    status: number;
    _data: any | ApiResponse<undefined>  | undefined;
    ok: boolean;
  };
}
