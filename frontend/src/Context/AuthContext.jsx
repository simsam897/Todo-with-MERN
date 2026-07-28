import { createContext, useState, useEffect } from "react";
import {
  signupUser,
  signinUser,
  signoutUser
} from "../services/authService";
import { useContext } from "react";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false)
  }, []);







  // Signup
  const signup = async (data) => {

    const res = await signupUser(data);

    return res;
  };

  // Signin
  const signin = async (data) => {
    const res = await signinUser(data);


    console.log(res.data

    );

    setUser(res.data.user);

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
        signout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)