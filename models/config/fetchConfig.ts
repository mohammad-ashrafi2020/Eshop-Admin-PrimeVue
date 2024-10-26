export interface FetchConfig {
  baseURL?: string;
  ignoreResponseError?: boolean;
  duplex?: "half" | undefined;
  agent?: unknown;
  timeout?: number;
  retry?: number | false;
  retryStatusCodes?: number[];
}
