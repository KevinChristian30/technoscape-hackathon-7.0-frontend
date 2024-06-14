import axios from "axios";
import { getCookie } from "./cookies";
import constants from "./constants";
import { constructBearerToken } from "./auth";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

http.interceptors.request.use(
  async (config) => {
    const token = getCookie(constants.cookie.token);
    if (token) {
      config.headers.Authorization = constructBearerToken(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
