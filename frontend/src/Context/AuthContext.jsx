import { createContext, useState, useEffect } from "react";
import {
  signupUser,
  signinUser,
  signoutUser,
  updateProfile
} from "../services/authService";
import { useContext } from "react";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false)
  }, []);


  // const updateUserProfile = async (data) => {
  //   const res = await updateProfile(data);

  //   setUser(res.data.user);

  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify(res.data.user)
  //   );

  //   return res;
  // };

  const updateUserProfile = async (formData) => {
    try {
      setUpdating(true);

      const res = await updateProfile(formData);

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return res;
    } finally {
      setUpdating(false);
    }
  };


  // Signup
  const signup = async (data) => {

    const res = await signupUser(data);

    return res;
  };

  // Signin
  const signin = async (data) => {
    const res = await signinUser(data);


    console.log(res.data.user);

    setUser(res.data.user)

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    return res;
  };






  // Logout
  const signout = async () => {

    await signoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };




  return (

    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        loading,
        signout,
        updating,
        updateUserProfile

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)