import API from "./service";

export const signupUser = async (data) => {
  const response = await API.post("/user/signup", data);
  return response.data;
};

export const signinUser = (data) => {
  return API.post("/user/signin", data);
};

export const signoutUser = () => {
  return API.post("/user/signout");
};

export const updateProfile = (formData) => {
  return API.put("/user/update-profile", formData);
};
