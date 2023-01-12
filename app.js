const express = require("express");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
require("./config/db")();
const app = express();

const configureCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
configureCloudinary();

require("./config/morgan")(app);
require("./config/routes")(app);

app.get("/", (req, res) => {
  res.send("ToDo Working!");
});

const port = parseInt(process.env.PORT) || 5006;

app.listen(port, () => console.log(`server started at ${port}`));
