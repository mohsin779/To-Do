const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const postSchema = new Schema({
  title: String,
  description: String,
  image: String,
  status: Boolean,
  labels: [
    {
      type: Schema.Types.ObjectId,
      ref: "Label",
    },
  ],
});

const validation = Joi.object({
  title: Joi.string().trim(true).required(),
  description: Joi.string().trim(true).required(),
  status: Joi.boolean().required(),
  image: [Joi.string().trim(true).optional(), Joi.allow(null)],
  labels: Joi.array().required(),
});

const Post = model("Post", postSchema);
exports.Post = Post;
exports.PostValidations = validation;
