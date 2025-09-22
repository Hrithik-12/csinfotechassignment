const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["csv", "xlsx", "xls"];
  const ext = file.originalname.split(".").pop();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv, .xlsx, .xls files allowed!"), false);
  }
};

module.exports = multer({ storage, fileFilter });
