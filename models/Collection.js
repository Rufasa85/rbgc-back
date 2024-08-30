const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Collection extends Model {}

Collection.init(
  {},
  {
    sequelize,
  }
);

module.exports = Collection;
