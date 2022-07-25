import {
  addAuthorizationHeader,
  addGpbReguestId,
  needConfirm,
} from "@nfort/logistics-core/lib/misc/axios/interceptors";
import Axios, { AxiosRequestConfig, AxiosError } from "axios-latest";
import { handleDates } from "./handleDates";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "/logistics/coordinator/api/",
}); // use your own URL here or environment variable
/* @ts-ignore */
AXIOS_INSTANCE.interceptors.request.use(addAuthorizationHeader);
/* @ts-ignore */
AXIOS_INSTANCE.interceptors.request.use(addGpbReguestId);
/* @ts-ignore */
AXIOS_INSTANCE.interceptors.response.use(needConfirm);
/* @ts-ignore */
AXIOS_INSTANCE.interceptors.response.use(handleDates);

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
