const formatPhoneNumber = require("../helpers/formatPhoneNumber")
const { comparePassword, createAccessToken } = require("../helpers/helper")
const { User } = require("../models")
const moment = require("moment")

const { Op } = require("sequelize")

class Controller {
  // REGISTER
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body
      let body = {
        username,
        email,
        password,
        phoneNumber: formatPhoneNumber(phoneNumber),
        address,
      }

      const data = await User.create(body)

      res.status(201).json({
        statusCode: 201,
        message: `Selamat Anda ${data.username}, anda Berhasil Register`,
        data: data,
      })
    } catch (error) {
      next(error)
    }
  }

  // LOGIN
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const data = await User.findOne({
        where: {
          email,
        },
      })

      if (!data) {
        throw { name: "Email/Password Salah" }
      }

      if (!comparePassword(password, data.password)) {
        throw { name: "Email/Password Salah" }
      }

      const payload = {
        id: data.id,
        email: data.email,
      }
      const authorization = createAccessToken(payload)

      res.status(201).json({
        statusCode: 201,
        message: `Selamat ${data.username}, anda Berhasil Login`,
        username: data.username,
        email: data.email,
        authorization: authorization,
      })
    } catch (error) {
      next(error)
    }
  }

  // GET ALL USER
  static async getAllUsers(req, res, next) {
    try {
      // MENDAPATKAN SEMUA DATA USER
      const { limit, page, search, tanggal } = req.query

      let pagination = {
        where: {},
        attributes: {
          exclude: ["password"],
        },
        limit: limit ? limit : 50,
        order: [["name", "asc"]],
      }

      if (limit) {
        pagination.limit = limit
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit
      }

      if (search) {
        pagination.where = {
          [Op.or]: [
            { username: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        }
      }

      if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`)
        const masuk = moment().format(`${tanggal} 23:59`)
        pagination.where = {
          createdAt: {
            [Op.between]: [pagi, masuk],
          },
        }
      }

      let dataUser = await User.findAndCountAll(pagination)

      let totalPage = Math.ceil(dataUser.count / (limit ? limit : 50))

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data User",
        data: dataUser.rows,
        totaldataUser: dataUser.count,
        totalPage: totalPage,
      })
    } catch (error) {
      next(error)
    }
  }

  // GET ONE USER
  static async getUser(req, res, next) {
    try {
      const { id } = req.params
      const data = await findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
      })

      if (!data) {
        throw { name: "Id User Tidak Ditemukan" }
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data User",
        data: data,
      })
    } catch (error) {
      next(error)
    }
  }

  // UPDATE USER
  static async updateUser(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  // UPDATE STATUS ACTIVE USER
  static async updateStatusActiveUser(req, res, next) {
    try {
      const { id } = req.params
      const { statusActive } = req.body

      const data = await findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id User Tidak Ditemukan" }
      }

      await User.update(
        { statusActive },
        {
          where: {
            id,
          },
        },
      )

      res.status(200).json({
        statusCode: 200,
        message: `Berhasil Memperbaharui Status Active ${data.username}`,
      })
    } catch (error) {
      next(error)
    }
  }

  // DELETE USER
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params
      const data = await findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id User Tidak Ditemukan" }
      }

      await User.destroy({
        where: {
          id,
        },
      })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data User",
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
