const multer = require("multer");
const path = require("path");

const tmpDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;