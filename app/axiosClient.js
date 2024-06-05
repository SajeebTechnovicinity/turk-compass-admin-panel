"use client";
const { main_url } = process.env;
import axios from "axios";
// import { useDispatch, useSelector} from "react-redux";
import { getCookie } from "cookies-next";
const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosClient = axios.create({
  //baseURL: `http://localhost:8080/api/v1`,
  baseURL:`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
});
axiosClient.interceptors.request.use((config) => {





  //const token = getCookie("authToken");
  const token = sessionStorage.getItem("authToken");
//const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIgMTQiLCJlbWFpbCI6ImxpcGFuLmR1dHRhKzE0QGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6ImNsaWVudCIsInBhY2thZ2VfdHlwZSI6InByZW1pdW1fZW1wbG95ZXIiLCJpZCI6IjY2NWYxZjQ3ZmQ5Njk0YTcwZjA0YmVlOSIsImlzX211bHRpcGxlX3Jlc2VydmF0aW9uX2F2YWlsYWJsZSI6ZmFsc2UsInNsb3RfZHVyYXRpb24iOjAsImlzX3Jlc2VydmF0aW9uX2F2YWlsYWJsZSI6ZmFsc2UsImlhdCI6MTcxNzU2ODkyOSwiZXhwIjoxNzE3NTcyNTI5fQ.waocf83pZepfbIdLauha506r9764EyOe_WFKSp7i61I";
  config.headers.Authorization = "Bearer " + token;
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401) {
        //    401 Unauthorized;
        localStorage.removeItem("ACCESS_TOKEN");
      }
      if (response.status === 405) {
        alert("Method Not Allowed");
      }
      return response;
    } catch (e) {
      console.error(e);
    }
    throw error;
  }
);

export default axiosClient;
