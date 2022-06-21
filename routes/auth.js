const { Router } = require("express");
const User = require("../models/user");
const { body } = require("express-validator");
const authContoller = require("../controllers/auth");

const router = Router();

router.put(
  "/signup",
  [
    body("email", "Please enter a valid email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password must be at least 5 characters")
      .trim()
      .isLength({ min: 5 }),
    body("name", "Name cannot be empty").trim().not().isEmpty(),
  ],
  authContoller.postSignup
);

router.post("/login", authContoller.login);

module.exports = router;
