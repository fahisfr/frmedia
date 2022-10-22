import axios from "axios";

export const baseURL = process.env.API_BASE_URL;

export const getFileUrl = (fileName, fileType) =>
  `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${fileType}/${fileName}`;

export const getProfileUrl = (imageName = "default_image.jpg") =>
  imageName.startsWith("http") ? imageName : getFileUrl(imageName, "profile");

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
