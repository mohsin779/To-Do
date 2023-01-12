const { StatusCodes } = require("http-status-codes");
const { Label, LabelValidations } = require("../models/label");

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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
  }
};
