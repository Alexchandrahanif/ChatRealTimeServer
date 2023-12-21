"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class GroupMessage extends Model {
    static associate(models) {
      GroupMessage.belongsTo(models.Group, {
        foreignKey: "GroupId",
      })
      GroupMessage.belongsTo(models.User, {
        foreignKey: "SenderId",
        as: "PengirimGroup",
      })
    }
  }
  GroupMessage.init(
    {
      GroupId: DataTypes.UUID,
      SenderId: DataTypes.UUID,
      message: DataTypes.TEXT,
      messageImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GroupMessage",
    },
  )
  return GroupMessage
}
