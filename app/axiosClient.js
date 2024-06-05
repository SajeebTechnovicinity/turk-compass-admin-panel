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
  //const token = sessionStorage.getItem("authToken");
const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkxpcGFuIER1dHRhIiwiZW1haWwiOiJhZG1pbkB0ZWNobm92aWNpbml0eS5jb20iLCJ1c2VyX3R5cGUiOiJhZG1pbiIsInBhY2thZ2VfdHlwZSI6bnVsbCwiaWQiOiI2NjVlZTE3YTYyNmM1MDI0YjJmODRkYzkiLCJpc19tdWx0aXBsZV9yZXNlcnZhdGlvbl9hdmFpbGFibGUiOmZhbHNlLCJzbG90X2R1cmF0aW9uIjowLCJpc19yZXNlcnZhdGlvbl9hdmFpbGFibGUiOmZhbHNlLCJpYXQiOjE3MTc1ODM5NDN9.jvwQFlEfhEC2YS2b2gGcO40Ns3IUWz0OynBlZzBhpSY";
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
