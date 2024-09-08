import axios from "axios";
import { toast } from "react-toastify";
import { globalNavigate } from "../Utilities/globalNavigator";
import { auth } from "../firebase";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function responseBody(response) {
  return response.data;
}

axios.interceptors.request.use(
  async (config) => {
    if (!config) {
      console.error("Config object is undefined in request interceptor");
      return Promise.reject(new Error("Config object is undefined"));
    }
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      const { data, status } = response;
      switch (status) {
        case 400:
          if (data.errors) {
            const modalErrors = Object.values(data.errors).flat();
            toast.error(modalErrors.join("\n"));
          } else {
            toast.error(data.title);
          }
          break;
        case 401:
          toast.error("Unauthorized, Please Login");
          globalNavigate("/");
          break;
        case 404:
          toast.error(
            "Not Found, you may have entered an incorrect URL. You will be redirected to the home page within 5 seconds."
          );
          setTimeout(() => {
            globalNavigate("/");
          }, 5000);
          break;
        case 500:
          toast.error(data.title);
          break;
        default:
          toast.error("An unexpected error occurred");
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Tenant = {
  register: (tenant) => requests.post("/Tenant/register", tenant),
  googleLogin: (googleUser) =>
    requests.post("/Tenant/google-login", googleUser),
};

const apiConnector = {
  Tenant,
};

export default apiConnector;
