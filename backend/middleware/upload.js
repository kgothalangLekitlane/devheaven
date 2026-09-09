const multer = require("multer")

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"])

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, or WEBP images are allowed"))
    }
    cb(null, true)
  },
})

const hasSignature = (buffer, mimetype) => {
  if (!Buffer.isBuffer(buffer)) return false
  if (mimetype === "image/jpeg") return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  if (mimetype === "image/png") return buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  if (mimetype === "image/webp") return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP"
  return false
}

const validateImageContent = (req, res, next) => {
  if (!req.file || hasSignature(req.file.buffer, req.file.mimetype)) return next()
  return res.status(400).json({ error: "The uploaded file is not a valid JPG, PNG, or WEBP image" })
}

module.exports = upload
module.exports.validateImageContent = validateImageContent
