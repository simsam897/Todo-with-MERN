import bcrypt from "bcrypt";
import User from "../Models/User.Model.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

// ==================== SIGNUP ====================

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    // Production / Development cookie configuration
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);

    return res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

// ==================== SIGNIN ====================

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Create authentication cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Signin successful",
      user: {
        id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);

    return res.status(500).json({
      message: "Error signing in",
      error: err.message,
    });
  }
};

// ==================== SIGNOUT ====================

export const signout = (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Signout successful",
    });
  } catch (err) {
    console.error("Signout error:", err);

    return res.status(500).json({
      message: "Error signing out",
      error: err.message,
    });
  }
};

// ==================== UPDATE USER ====================

export const updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update email
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    // Update password
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Upload profile picture
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pictures",
      });

      user.profilePicture = result.secure_url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==================== UPLOAD PROFILE PICTURE ====================

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        profilePicture: result.secure_url,
      },
      {
        new: true,
      },
    ).select("-password");

    return res.status(200).json({
      message: "Profile picture uploaded",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload profile picture error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==================== UPDATE PROFILE ====================

export const updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update email
    if (email && email.trim() !== "") {
      user.email = email;
    }

    // Update password
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update profile picture
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profilePictures",
      });

      user.profilePicture = result.secure_url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
