const express = require("express");
const router = express.Router();
const { User, Wishlist, Game, Note } = require("../models");
const tokenAuth = require("../middleware/tokenAuth");

router.post("/", tokenAuth, (req, res) => {
  Wishlist.findOrCreate({
    where: { UserId: req.user, GameId: req.body.GameId },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});

router.delete("/:gameId", tokenAuth, (req, res) => {
  Wishlist.destroy({
    where: { UserId: req.user, GameId: req.params.gameId },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});

module.exports = router;
