const express = require("express");
const router = express.Router();
const { User, Collection, Game, Note } = require("../models");
const tokenAuth = require("../middleware/tokenAuth");

router.post("/", tokenAuth, (req, res) => {
  console.log(req.body);
  Collection.findOrCreate({
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
  Collection.destroy({
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
