const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    // add properites here, ex:
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [3],
      },
    },
  },
  {
    sequelize,
    hooks: {
      beforeCreate: (userObj) => {
        userObj.password = bcrypt.hashSync(userObj.password, 6);
      },
    },
  }
);

module.exports = User;
