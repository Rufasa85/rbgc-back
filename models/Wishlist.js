const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Wishlist extends Model {}

Wishlist.init(
  {},
  {
    sequelize,
  }
);

module.exports = Wishlist;
