const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model {}

Game.init(
  {
    // add properites here, ex:
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
  }
);

module.exports = Game;
