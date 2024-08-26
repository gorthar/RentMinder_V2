import axios from "axios";
import firebase from "firebase/auth";
import { toast } from "react-toastify";
import { globalNavigate } from "../Utilities/globalNavigator";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function responseBody(response) {
  return response.data;
}

axios.interceptors.request.use(
  (config) => {
    const token = firebase.auth().currentUser.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("getAuthToken", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error;
    if (status === 400) {
      if (data.errors) {
        const modalErrors = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modalErrors.push(data.errors[key]);
          }
        }
        toast.error(modalErrors.flat().join("\n"));
      } else {
        toast.error(data.title);
      }
    } else if (status === 401) {
      toast.error("Unauthorized, Please Login", data.title);
      globalNavigate("/");
    } else if (status === 404) {
      toast.error(
        "Not Found, you may have entered an incorrect URL. You will be redirected to the home page within 5 seconds."
      );
      setTimeout(() => {
        globalNavigate("/");
      }, 5000);
    } else if (status === 500) {
      toast.error(data.title);
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

const User = {
  register: (user) => requests.post("/user/register", user),
  googleLogin: (googleUser) => requests.post("/user/google-login", googleUser),
};

const apiConnector = {
  User,
};
export default apiConnector;
