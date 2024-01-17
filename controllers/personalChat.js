const { User, PersonalChat } = require("../models")

class Controller {
  // GET ALL
  static async getAllChat(req, res, next) {
    try {
      const { ReceiverId } = req.params

      const dataReceiver = await User.findOne({ where: { ReceiverId } })

      if (!dataReceiver) {
        throw { name: "Id User Tidak Ditemukan" }
      }
      const dataChat = await PersonalChat.findAll({
        where: {
          ReceiverId,
          SenderId: req.user.id,
        },
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

      const dataChat = await PersonalChat.findOne({
        where: {
          id,
        },
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
      const { SenderId, ReceiverId, message } = req.body
      const dataSender = await User.findOne({ where: { SenderId } })
      const dataReceiver = await User.findOne({ where: { ReceiverId } })

      if (!dataSender || !dataReceiver) {
        throw { name: "Id User Tidak Ditemukan" }
      }

      const dataChat = await PersonalChat.create({
        SenderId,
        ReceiverId,
        message,
        messageImage: req.file ? req.file.path : "",
        readMessageStatus: false,
      })

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

      const dataChat = await PersonalChat.findOne({
        where: {
          id,
        },
      })

      if (!dataChat) {
        throw { name: "Id Chat Tidak Ditemukan" }
      }

      await PersonalChat.update({ message, isUpdate: true }, { where: { id } })

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

      const dataChat = await PersonalChat.update(
        { readMessageStatus: true },
        {
          where: {
            SenderId,
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

      const dataChat = await PersonalChat.findOne({
        where: {
          id,
        },
      })

      if (!dataChat) {
        throw { name: "Id Chat Tidak Ditemukan" }
      }

      await PersonalChat.destroy({
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
