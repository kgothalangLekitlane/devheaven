const multer = require("multer")
const path = require("path")

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"])

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    const safeOriginalName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, "_")
    cb(null, uniqueSuffix + "-" + safeOriginalName)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, or WEBP images are allowed"))
    }
    cb(null, true)
  }
})

module.exports = upload
