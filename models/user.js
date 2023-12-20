"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email Must Be Format Email",
        },
        validate: {
          notEmpty: {
            msg: "Email Is Required",
          },
          notNull: {
            msg: "Email Is Required",
          },
          isEmail: {
            msg: "Must Format Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password Is Required",
          },
          notNull: {
            msg: "Password Is Required",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      code: DataTypes.STRING,
      expiredCod: DataTypes.DATE,
      lastLogin: DataTypes.DATE,
      statusActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    },
  )
  return User
}
