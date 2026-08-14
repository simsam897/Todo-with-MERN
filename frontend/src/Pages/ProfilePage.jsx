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
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/silhouette-person-icon.svg",
  );

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) return;

    // Check password confirmation
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();

    // Email
    if (email !== user?.email) {
      formData.append("email", email);
    }

    // Password
    if (password.trim()) {
      formData.append("password", password);
    }

    // Profile picture
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    // Check if nothing changed
    if (email === user?.email && !password.trim() && !profilePicture) {
      alert("No changes to update");
      return;
    }

    try {
      const res = await updateUserProfile(formData);

      alert(res.data.message);

      // Reset password fields
      setPassword("");
      setConfirmPassword("");

      // Reset selected file
      setProfilePicture(null);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6 sm:p-6">
      <div className="bg-white shadow-lg rounded-xl p-5 sm:p-8 w-full max-w-md mt-14">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ================= PROFILE PICTURE ================= */}
          <div className="flex flex-col items-center w-full">
            <img
              src={preview}
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
            />

            {/* Responsive File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="
                w-full
                h-12
                mt-4
                border
                border-gray-300
                rounded-lg
                text-sm
                text-gray-600
                cursor-pointer
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                file:h-full
                file:px-3
                sm:file:px-4
                file:mr-3
                sm:file:mr-4
                file:border-0
                file:border-r
                file:border-gray-300
                file:bg-gray-50
                file:text-gray-700
                file:font-medium
                file:cursor-pointer
              "
            />
          </div>

          {/* ================= EMAIL ================= */}
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                h-12
                border
                border-gray-300
                rounded-lg
                px-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* ================= NEW PASSWORD ================= */}
          <div>
            <label className="block mb-2 font-medium">New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                h-12
                border
                border-gray-300
                rounded-lg
                px-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* ================= CONFIRM PASSWORD ================= */}
          <div>
            <label className="block mb-2 font-medium">Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full
                h-12
                border
                border-gray-300
                rounded-lg
                px-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* ================= SAVE BUTTON ================= */}
          <button
            type="submit"
            disabled={updating}
            className={`
              w-full
              h-12
              rounded-lg
              text-white
              font-semibold
              transition

              ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
