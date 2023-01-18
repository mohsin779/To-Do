const { StatusCodes } = require("http-status-codes");
const { Label, LabelValidations } = require("../models/label");
const { Post } = require("../models/post");

exports.addLabel = async (req, res) => {
  try {
    const { error } = LabelValidations.validate(req.body);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.details[0].message });
    }

    const newLabel = new Label(req.body);
    await newLabel.save();

    res.status(StatusCodes.OK).send({ label: newLabel });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

exports.getLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.status(StatusCodes.OK).send({ labels });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

exports.deleteLabel = async (req, res) => {
  try {
    // const { id } = req.body;
    // const labelId = req.query.id;
    const { id } = req.params;

    const label = await Label.findById(id);
    let posts = await Post.find();

    if (label) {
      posts = await Promise.all(
        posts.map(async post => {
          const found = post.labels.filter(label => {
            return label._id.toString() == id;
          });
          if (found.length > 0) {
            return post;
          }
        })
      );
      posts = posts.filter(post => post);
      if (posts.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          message:
            "Label is associated to one or more mosts, kindly delete those posts first!",
        });
      }

      await Label.findByIdAndRemove(id);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Label not found!" });
    }
    res.status(StatusCodes.OK).send({ message: "Label deleted!" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};
