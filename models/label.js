const { Schema, model } = require("mongoose");
const Joi = require("joi");

const labelSchema = new Schema({
  title: String,
  color: String,
});

const validation = Joi.object({
  title: Joi.string().trim(true).required(),
  color: Joi.string().trim(true).required(),
});

const Label = model("Label", labelSchema);
exports.Label = Label;
exports.LabelValidations = validation;
