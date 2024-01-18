"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsTo(models.User, {
        foreignKey: "AdminId",
      })

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
      AdminId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Group",
    },
  )
  return Group
}
