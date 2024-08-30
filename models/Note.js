const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Note extends Model {}

Note.init(
  {
    // add properites here, ex:
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Note;
