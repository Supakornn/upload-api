const File = require("../models/FileModel");
const { StatusCodes } = require("http-status-codes");

const createFile = async (req, res) => {
  console.log(req.body);
  const file = await File.create(req.body);
  res.status(StatusCodes.CREATED).json({ file });
};

const getAllFile = async (req, res) => {
  const file = await File.find({});
  res.status(StatusCodes.OK).json({ file });
};

module.exports = { createFile, getAllFile };
