"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class PersonalMessage extends Model {
    static associate(models) {
      PersonalMessage.belongsTo(models.User, {
        foreignKey: "SenderId",
        as: "Pengirim",
      })

      PersonalMessage.belongsTo(models.User, {
        foreignKey: "ReceiverId",
        as: "Penerima",
      })
    }
  }
  PersonalMessage.init(
    {
      SenderId: DataTypes.UUID,
      ReceiverId: DataTypes.UUID,
      message: DataTypes.TEXT,
      messageImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PersonalMessage",
    },
  )
  return PersonalMessage
}
