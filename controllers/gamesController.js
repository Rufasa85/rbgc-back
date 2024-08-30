const express = require("express");
const router = express.Router();
const { Game, Wishlist, Collection, User, Note } = require("../models");
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

router.get("/most-wanted", (req, res) => {
  Game.findAll()
    .then(async (foundGames) => {
      const gamesWithWishes = [];
      for (let i = 0; i < foundGames.length; i++) {
        const game = foundGames[i];
        console.log(game);
        const numWishes = await game.countWishlists();
        const newGameObj = game.toJSON();
        newGameObj.wishes = numWishes;
        gamesWithWishes.push(newGameObj);
      }
      const mostWanted = gamesWithWishes
        .filter((game) => game.wishes > 0)
        .toSorted((a, b) => {
          if (a.wishes > b.wishes) {
            return -1;
          } else {
            return 1;
          }
        })
        .slice(0, 5);
      console.log(mostWanted);
      res.json(mostWanted);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});
// router.get("/most-wanted", (req, res) => {
//   Game.findAll({
//     include: [
//       {
//         model: Wishlist,
//       },
//     ],
//     attributes: {
//       include: [
//         [Sequelize.fn("COUNT", Sequelize.col("Wishlists.GameId")), "wishes"],
//       ],
//     },
//     group: ["Game.id"],
//   }).then((data) => {
//     console.log(data);
//     res.json(data);
//   });
// });

router.get("/most-collected", (req, res) => {
  Game.findAll()
    .then(async (foundGames) => {
      const gameWithCollections = [];
      for (let i = 0; i < foundGames.length; i++) {
        const game = foundGames[i];
        console.log(game);
        const numCollected = await game.countCollections();
        const newGameObj = game.toJSON();
        newGameObj.collections = numCollected;
        gameWithCollections.push(newGameObj);
      }
      const mostCollected = gameWithCollections
        .filter((game) => game.collections > 0)
        .toSorted((a, b) => {
          if (a.collections > b.collections) {
            return -1;
          } else {
            return 1;
          }
        })
        .slice(0, 5);
      console.log(mostCollected);
      res.json(mostCollected);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});

module.exports = router;
