import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/User",
  withCredentials: true,
});

export const signupUser = (data) => API.post("/signup", data);

export const signinUser = (data) => API.post("/signin", data);



export const signoutUser = () => API.post("/signout");
