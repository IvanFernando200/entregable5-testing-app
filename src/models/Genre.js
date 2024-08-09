const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
// In capital letters and singular      // In lowercase and singular
const Genre = sequelize.define("genre", {
  // we define the columns here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Genre;
