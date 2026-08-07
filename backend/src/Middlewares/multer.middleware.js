// import multer from "multer";
// import cloudinary from "../utils/cloudinary.js";

// const storage = multer.diskStorage({});

// const upload = multer({
//   storage,
// });

// export default upload;

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
});
