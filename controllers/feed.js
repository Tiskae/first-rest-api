const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      if (!posts) {
        const error = new Error("No posts found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422; // validation error
    throw error;
  }

  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
    creator: { name: "Eniola" },
    imageUrl: "images/view.jpeg",
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const postError = new Error("Could not find post");
        postError.statusCode = 404;
        throw postError;
      }
      res.status(200).json({
        message: "Post fetched successfully!",
        post,
      });
    })
    .catch((err) => {
      if (!error.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
