"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    static associate(models) {
      GroupMember.belongsTo(models.User, {
        foreignKey: "UserId",
      })
      GroupMember.belongsTo(models.Group, {
        foreignKey: "GroupId",
      })
    }
  }
  GroupMember.init(
    {
      UserId: DataTypes.UUID,
      GroupId: DataTypes.UUID,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GroupMember",
    },
  )
  return GroupMember
}
