const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPost = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: new Date().toISOString(),
        title: "first post",
        content: "This is a first post",
        imageUrl: "/images/view.jpeg",
        creator: {
          name: "Blessing",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect",
      errors: errors.array(),
    });
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
    .catch(console.err);
};
