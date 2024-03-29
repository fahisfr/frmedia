import axios from "axios";

export const baseURL = process.env.API_BASE_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("auth_token");
    if (accessToken) {
      config.headers["x-access-token"] = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const { data } = await instance.get("/account/refreshtoken", {
        withCredentials: true,
      });
      if (data.status == "ok") {
        localStorage.setItem("auth_token", data.token);
        return instance.request(prevRequest);
      }

      localStorage.removeItem("auth_token");

      return Promise.reject(error);
    }
  }
);

export default instance;
