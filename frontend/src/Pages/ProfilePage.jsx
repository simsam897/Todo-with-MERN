

import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const { user, updateUserProfile, updating } = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);

  const [preview, setPreview] = useState(
    user?.profilePicture ||
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/silhouette-person-icon.svg"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) return;

    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();

    if (email !== user.email) {
      formData.append("email", email);
    }

    if (password.trim()) {
      formData.append("password", password);
    }

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    if (
      email === user.email &&
      !password.trim() &&
      !profilePicture
    ) {
      alert("No changes to update");
      return;
    }

    try {
      const res = await updateUserProfile(formData);

      alert(res.data.message);

      setPassword("");
      setConfirmPassword("");
      setProfilePicture(null);
    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md mt-14">

        <h1 className="text-3xl font-bold text-center mb-8">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Profile Picture */}

          <div className="flex flex-col  items-center">

            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4 mx-auto border-gray-400 bg-gray-50 border-2 rounded-lg"
            />

          </div>

          {/* Email */}

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>

          {/* Save Button */}

          <button
            type="submit"
            disabled={updating}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${updating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;