const express = require("express");
const router = express.Router();

const gamesRoutes = require("./gamesController");
router.use("/api/games", gamesRoutes);

module.exports = router;
