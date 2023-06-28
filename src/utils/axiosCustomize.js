import axios from "axios";
import nProgress from "nprogress";
import { store } from "../../src/redux/store.js";

const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
});
instance.interceptors.request.use(
  function (config) {
    let access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = "Bearer " + access_token;
    nProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    nProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
