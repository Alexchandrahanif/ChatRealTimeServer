"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.User, {
        foreignKey: "ContactId",
        as: "Contact",
      })
      Contact.belongsTo(models.User, {
        foreignKey: "PemilikId",
        as: "Pemilik",
      })
    }
  }
  Contact.init(
    {
      username: DataTypes.STRING,
      ContactId: DataTypes.UUID,
      PemilikId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Contact",
    },
  )
  return Contact
}
