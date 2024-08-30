const express = require("express");
const router = express.Router();
const { User, Wishlist, Game, Note, Collection } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../middleware/tokenAuth");

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    include: [Collection, Wishlist],
  }).then((foundUser) => {
    if (!foundUser) {
      return res.status(401).json({ msg: "invalid login" });
    } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(401).json({ msg: "invalid login" });
    } else {
      const token = jwt.sign(
        {
          id: foundUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      return res.json({
        token: token,
        user: {
          email: foundUser.email,
          id: foundUser.id,
          username: foundUser.username,
          Wishlists: foundUser.Wishlists,
          Collections: foundUser.Collections,
        },
      });
    }
  });
});

router.get("/fromtoken", tokenAuth, async (req, res) => {
  try {
    const me = await User.findByPk(req.user, {
      attributes: ["id", "username", "email"],
      include: [Collection, Wishlist],
    });
    res.json(me);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "auth failed", err });
  }
});

module.exports = router;
