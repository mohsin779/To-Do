const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const PostRoutes = require("../routes/post");
const LabelRoutes = require("../routes/label");

module.exports = function (app) {
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(cors());

  app.use("/api/post", PostRoutes);
  app.use("/api/label", LabelRoutes);
};
