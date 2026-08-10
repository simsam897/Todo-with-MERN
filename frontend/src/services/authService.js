import API from "./service";

// SIGNUP
export const signupUser = (data) => {
  return API.post("/user/signup", data);
};

// SIGNIN
export const signinUser = (data) => {
  return API.post("/user/signin", data);
};

// CURRENT USER
export const getCurrentUser = () => {
  return API.get("/user/me");
};

// SIGNOUT
export const signoutUser = () => {
  return API.post("/user/signout");
};

// UPDATE PROFILE
export const updateProfile = (formData) => {
  return API.put("/user/update-profile", formData);
};