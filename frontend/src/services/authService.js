import API from "./service";

export const signupUser = (data) => API.post("/user/signup", data);

export const signinUser = (data) => API.post("/user/signin", data);

export const signoutUser = () => API.post("/user/signout");

export const updateProfile = (formData) =>
  API.put("/user/update-profile", formData);
