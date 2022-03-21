const File = require("../models/FileModel");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadFile = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const fileImg = req.files.img;

  if (!fileImg.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (fileImg.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller 1MB");
  }

  const imgPath = path.join(__dirname, "../public/uploads", `${fileImg.name}`);
  await fileImg.mv(imgPath);
  return res.status(StatusCodes.OK).json({ img: { src: `/uploads/${fileImg.name}` } });
};

// const uploadClound = async (req, res) => {
//   const result = await cloudinary.uploader.upload(req.files.img.tempFilePath, {
//     use_filename: true,
//     folder: "file-upload"
//   });
//   fs.unlinkSync(req.files.img.tempFilePath);
//   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
// };

module.exports = uploadFile;
