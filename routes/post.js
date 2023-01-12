const express = require("express");

const postController = require("../controllers/post");
const imageUpload = require("../config/multerImage")();
const router = express.Router();

router.post("/add-post", imageUpload.single("image"), postController.addPost);
router.get("/get-posts", postController.getPosts);
router.delete("/delete-post/:postId", postController.deletePost);
router.patch(
  "/edit-post/:postId",
  imageUpload.single("image"),
  postController.editPost
);
router.get("/get-post/:postId", postController.getPost);

module.exports = router;
