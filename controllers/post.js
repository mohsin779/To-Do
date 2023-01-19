const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const { StatusCodes } = require("http-status-codes");
const { Post, PostValidations } = require("../models/post");

exports.addPost = async (req, res, next) => {
  try {
    const reqData = req.body;

    if (typeof reqData.labels === "string") {
      reqData.labels = [reqData.labels];
    }
    const { error } = PostValidations.validate(reqData);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.details[0].message });
    }
    let imagePath = "";
    if (req.file) {
      imagePath = await cloudinary.uploader.upload(req.file.path);
    }
    const { title, description, labels, status } = reqData;

    const newPost = new Post({
      title: title,
      description: description,
      labels: labels,
      image: imagePath.secure_url,
      status: status,
    });
    await newPost.save();
    clearImage(req.file.path);

    res.status(StatusCodes.OK).send({ post: newPost });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.stus(StatusCodes.NOT_FOUND).send({ error: "Post not found" });
    }
    if (post.image) {
      var filename = post.image.split("/").pop();
      filename = filename.split(".")[0];
      cloudinary.uploader.destroy(filename);
    }
    await Post.findByIdAndRemove(postId);

    return res.status(StatusCodes.OK).send({ message: "Post Deleted." });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

exports.editPost = async (req, res) => {
  try {
    const reqData = req.body;

    if (typeof reqData.labels === "string") {
      reqData.labels = [reqData.labels];
    }

    const { error } = PostValidations.validate(reqData);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.details[0].message });
    }
    const { title, description, labels, status } = reqData;
    const { postId } = req.params;
    const post = await Post.findById(postId);
    let imagePath = post.image;

    if (req.file) {
      var filename = post.image.split("/").pop();
      filename = filename.split(".")[0];
      cloudinary.uploader.destroy(filename);
      imagePath = await cloudinary.uploader.upload(req.file.path);
      imagePath = imagePath.secure_url;
      clearImage(req.file.path);
    }

    post.title = title;
    post.description = description;
    post.labels = labels;
    post.image = imagePath;
    post.status = status;
    await post.save();
    return res.status(StatusCodes.OK).send({ post, message: "Post Updated." });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    let posts;
    const labelId = req.query.label;
    posts = await Post.find().populate("labels");

    if (labelId) {
      posts = await Promise.all(
        posts.map(async post => {
          const found = post.labels.filter(label => {
            return label._id.toString() == labelId;
          });
          if (found.length > 0) {
            return post;
          }
        })
      );
      posts = posts.filter(post => post);
    }
    res.status(StatusCodes.OK).send({ posts });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("labels");
    res.status(StatusCodes.OK).send({ post });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

const clearImage = filePath => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, err => (err ? console.log(err) : null));
};
