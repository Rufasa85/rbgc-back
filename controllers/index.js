const express = require("express");
const router = express.Router();

const userRoutes = require("./userController");
router.use("/api/users", userRoutes);

const gamesRoutes = require("./gamesController");
router.use("/api/games", gamesRoutes);

const collectionsRoutes = require("./collectionController");
router.use("/api/collections", collectionsRoutes);

const wishlistsRoutes = require("./wishlistController");
router.use("/api/wishlists", wishlistsRoutes);

module.exports = router;
