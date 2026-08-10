import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signupUser,
  signinUser,
  signoutUser,
  updateProfile,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // =========================
  // CHECK CURRENT USER
  // =========================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getCurrentUser();

        console.log("Current user:", res.data);

        setUser(res.data.user);
      } catch (error) {
        console.log("User is not authenticated");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // =========================
  // SIGNUP
  // =========================

  const signup = async (data) => {
    try {
      const res = await signupUser(data);

      console.log("Signup response:", res.data);

      setUser(res.data.user);

      return res;
    } catch (error) {
      throw error;
    }
  };

  // =========================
  // SIGNIN
  // =========================

  const signin = async (data) => {
    try {
      const res = await signinUser(data);

      console.log("Signin response:", res.data);

      setUser(res.data.user);

      return res;
    } catch (error) {
      console.error("Signin error:", error);

      throw error;
    }
  };

  // =========================
  // SIGNOUT
  // =========================

  const signout = async () => {
    try {
      await signoutUser();

      setUser(null);
    } catch (error) {
      console.error("Signout error:", error);

      throw error;
    }
  };

  // =========================
  // UPDATE PROFILE
  // =========================

  const updateUserProfile = async (formData) => {
    try {
      setUpdating(true);

      const res = await updateProfile(formData);

      setUser(res.data.user);

      return res;
    } catch (error) {
      console.error("Update profile error:", error);

      throw error;
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        signout,
        loading,
        updating,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);