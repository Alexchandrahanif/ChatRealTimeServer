"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: models.GroupMember,
        foreignKey: "GroupId",
      })

      Group.hasMany(models.GroupMember, {
        foreignKey: "GroupId",
      })

      Group.hasMany(models.GroupMessage, {
        foreignKey: "GroupId",
      })
    }
  }
  Group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      groupImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    },
  )
  return Group
}
