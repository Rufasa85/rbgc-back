const sequelize = require("../config/connection");
const { User, Game, Wishlist, Collection, Note } = require("../models");

const users = [
  {
    username: "boardGameChamp",
    email: "arra@arra.com",
    password: "meowmeow",
  },
  {
    username: "joejoejoe",
    email: "joe@arra.com",
    password: "password",
    isAdmin: true,
  },
];
const games = [
  {
    title: "Cascadia",
    description:
      "Place hexes to make the best environment and attract all the most iconic animals of Cascadia (as in, Washington, Oregon, and British Columbia)",
    img: "data:image/jpeg;base64,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",
  },
  {
    title: "Calico",
    description:
      "Place hexes to create a enticing quilt for all your cats to come take naps on",
  },
];
const collections = [
  {
    UserId: 1,
    GameId: 1,
  },
  {
    UserId: 1,
    GameId: 2,
  },
  {
    UserId: 2,
    GameId: 2,
  },
];
const wishlists = [
  {
    UserId: 2,
    GameId: 1,
  },
];
const notes = [
  {
    CollectionId: 1,
    UserId: 1,
    comment:
      "Really fun game but I can never win, I always place too many salmon",
  },
];

const seedMe = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(users, {
    individualHooks: true,
  });
  await Game.bulkCreate(games);
  await Wishlist.bulkCreate(wishlists);
  await Collection.bulkCreate(collections);
  await Note.bulkCreate(notes);
  console.log("seeded!");
  process.exit(0);
};

seedMe();
