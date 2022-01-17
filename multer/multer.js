const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "files_learn_english_app",
        resource_type: 'auto',
        allowedFormats: ['jpeg', 'png', 'jpg', 'mp3'],
    }
})
const upload = multer({ storage });
module.exports = upload;
