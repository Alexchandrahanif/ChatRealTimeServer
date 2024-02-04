const { Op } = require("sequelize")
const { User, PersonalMessage } = require("../models")
const io = require("socket.io")
const { exclude } = require("../helpers/helper")

class Controller {
  // GET ALL
  static async getAllChat(req, res, next) {
    try {
      const { ReceiverId } = req.params

      const dataReceiver = await User.findOne({ where: { id: ReceiverId } })
      const dataSender = await User.findOne({
        where: { id: req.user.id },
      })

      if (!dataReceiver || !dataSender) {
        throw { name: "Id User Tidak Ditemukan" }
      }

      const dataChat = await PersonalMessage.findAll({
        where: {
          [Op.or]: [
            { SenderId: req.user.id, ReceiverId },
            { SenderId: ReceiverId, ReceiverId: req.user.id },
          ],
        },
        include: [
          {
            model: User,
            as: "Pengirim",
            attributes: {
              exclude,
            },
          },
          {
            model: User,
            as: "Penerima",
            attributes: {
              exclude,
            },
          },
        ],
        order: [["createdAt", "ASC"]],
      })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Chat",
        data: dataChat,
      })
    } catch (error) {
      next(error)
    }
  }

  // GET ONE
  static async getOneChat(req, res, next) {
    try {
      const { id } = req.params

      const dataChat = await PersonalMessage.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            as: "Pengirim",
            attributes: {
              exclude,
            },
          },
          {
            model: User,
            as: "Penerima",
            attributes: {
              exclude,
            },
          },
        ],
      })

      if (!dataChat) {
        throw { name: "Id Chat Tidak Ditemukan" }
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Chat",
        data: dataChat,
      })
    } catch (error) {
      next(error)
    }
  }

  // CREATE
  static async createChat(req, res, next) {
    try {
      let SenderId = req.user.id
      const { ReceiverId, message } = req.body
      const dataReceiver = await User.findOne({ where: { id: ReceiverId } })

      if (!dataReceiver) {
        throw { name: "Id User Tidak Ditemukan" }
      }

      let messageImage = req.file ? req.file.path : ""

      const dataChat = await PersonalMessage.create({
        SenderId,
        ReceiverId,
        message,
        messageImage: messageImage,
        readMessageStatus: false,
        isUpdate: false,
      })

      // Kirim pesan menggunakan Socket.IO
      io.emit("progress", { SenderId, ReceiverId, message, messageImage })

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Chat Baru",
        data: dataChat,
      })
    } catch (error) {
      next(error)
    }
  }

  // UPDATE
  static async updateChat(req, res, next) {
    try {
      const { id } = req.params
      const { message } = req.body

      const dataChat = await PersonalMessage.findOne({
        where: {
          id,
        },
      })

      if (!dataChat) {
        throw { name: "Id Chat Tidak Ditemukan" }
      }

      await PersonalMessage.update(
        { message, isUpdate: true },
        { where: { id } },
      )

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Chat",
      })
    } catch (error) {
      next(error)
    }
  }

  // UPDATE STATUS
  static async updateStatusChat(req, res, next) {
    try {
      const { SenderId } = req.params

      const dataChat = await PersonalMessage.update(
        { readMessageStatus: true },
        {
          where: {
            SenderId,
            ReceiverId: req.user.id,
          },
        },
      )

      await res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Status Read Chat",
      })
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  static async deleteChat(req, res, next) {
    try {
      const { id } = req.params

      const dataChat = await PersonalMessage.findOne({
        where: {
          id,
        },
      })

      if (!dataChat) {
        throw { name: "Id Chat Tidak Ditemukan" }
      }

      await PersonalMessage.destroy({
        where: {
          id,
        },
      })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Chat",
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
