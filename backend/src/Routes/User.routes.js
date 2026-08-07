import express from "express";
import {
  signup,
  signin,
  signout,
  // updateUser,
  updateProfile,
} from "../controllers/User.controllers.js";
import { verifyToken } from "../Middlewares/Auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.put(
  "/update-profile",
  verifyToken,
  upload.single("profilePicture"),
  updateProfile,
);
export default router;
