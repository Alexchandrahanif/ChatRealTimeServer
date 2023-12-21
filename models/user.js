"use strict"
const { Model } = require("sequelize")
const { hashingPassword } = require("../helpers/helper")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Group, {
        through: models.GroupMember,
        foreignKey: "UserId",
      })

      User.hasMany(models.GroupMember, {
        foreignKey: "UserId",
      })

      User.hasMany(models.GroupMessage, {
        foreignKey: "UserId",
        as: "PengirimGroup",
      })

      User.hasMany(models.PersonalMessage, {
        foreignKey: "SenderId",
        as: "Pengirim",
      })

      User.hasMany(models.PersonalMessage, {
        foreignKey: "ReceiverId",
        as: "Penerima",
      })
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email Must Be Unique",
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
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Phone Number Must Be Unique",
        },
        validate: {
          notEmpty: {
            msg: "Phone Number Is Required",
          },
          notNull: {
            msg: "Phone Number Is Required",
          },
        },
      },
      address: DataTypes.STRING,
      code: DataTypes.STRING,
      expiredCode: DataTypes.DATE,
      lastLogin: DataTypes.DATE,
      statusActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    },
  )

  User.beforeCreate((data) => {
    data.password = hashingPassword(data.password)
  })

  return User
}
