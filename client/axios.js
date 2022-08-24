import axios from "axios";

export const baseURL = "http://localhost:4000";

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
    accessToken && (config.headers.auth_token = `${accessToken}`);
    return config;
  },
  (error) => Promise.reject(error)
);

export const aixosSSR = async (req, path) => {
  try {
    const token = req.cookies?.auth_token;

    const { data } = await axios.get(`${baseURL}/${path}`, {
      headers: {
        auth_token: token ?? null,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      error: "oops somthing went wrong:(",
    };
  }
};

export default instance;
