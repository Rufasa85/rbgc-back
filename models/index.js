const User = require("./User");
const Game = require("./Game");
const Wishlist = require("./Wishlist");
const Collection = require("./Collection");
const Note = require("./Note");

Wishlist.belongsTo(Game);
Game.hasMany(Wishlist);

Collection.belongsTo(Game);
Game.hasMany(Collection);

Note.belongsTo(Collection, {
  onDelete: "CASCADE",
});
Collection.hasMany(Note);

Wishlist.belongsTo(User, {
  onDelete: "CASCADE",
});
User.hasMany(Wishlist);

Collection.belongsTo(User, {
  onDelete: "CASCADE",
});
User.hasMany(Collection);

module.exports = {
  Note,
  Collection,
  Wishlist,
  Game,
  User,
};
