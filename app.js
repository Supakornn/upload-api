require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const mainRouter = require("./routes/mainRoute");
// database
const connectDB = require("./db/connect");

const fileRouter = require("./routes/fileRoute");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   clound_name: process.env.CLOUND_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// error handler
const notFoundMiddleware = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorhandler");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", mainRouter);
app.use("/api/", fileRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    await connectDB(process.env.DBURL);
    console.log("Connected DB");
  } catch (error) {
    console.log(error);
  }
};

start();
