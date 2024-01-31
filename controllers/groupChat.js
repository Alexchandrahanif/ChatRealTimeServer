const { User, GroupMessage, Group } = require("../models")
class Controller {
  // GET ALL
  static async getAllChat(req, res, next) {
    try {
      const { GroupId } = req.params

      const dataGroup = await Group.findOne({ where: { id: GroupId } })

      if (!dataGroup) {
        throw { name: "Id Group Tidak Ditemukan" }
      }

      const dataChatGroup = await GroupMessage.findAll({
        where: {
          GroupId,
        },
        include: [
          {
            model: User,
            as: "PengirimGroup",
            attributes: {
              exclude,
            },
          },
        ],
        order: [["createdAt", "ASC"]],
      })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Chat Group",
        data: dataChatGroup,
      })
    } catch (error) {
      next(error)
    }
  }

  // GET ONE
  static async getOneChat(req, res, next) {
    try {
      const { id } = req.params

      const dataChat = await GroupMessage.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            as: "PengirimGroup",
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
      const { GroupId, message } = req.body

      const SenderId = req.user.id

      const dataSender = await User.findOne({ where: { id: SenderId } })

      const dataGroup = await Group.findOne({ where: { id: GroupId } })

      if (!dataGroup) {
        throw { name: "Id Group Tidak Ditemukan" }
      }

      if (!dataSender) {
        throw { name: "Id User Tidak Ditemukan" }
      }

      let messageImage = req.file ? req.file.path : ""

      const dataChat = await GroupMessage.create({
        GroupId,
        SenderId,
        message,
        messageImage: messageImage,
        readMessageStatus: false,
        isUpdate: false,
      })

      // Kirim pesan menggunakan Socket.IO
      // io.emit("chat message", { SenderId, ReceiverId, message, messageImage })

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Chat Group Baru",
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

      const dataChat = await GroupMessage.findOne({
        where: {
          id,
        },
      })

      if (!dataChat) {
        throw { name: "Id Chat Tidak Ditemukan" }
      }

      await GroupMessage.update({ message, isUpdate: true }, { where: { id } })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Chat",
      })
    } catch (error) {
      next(error)
    }
  }

  // UPDATE STATUS
  // static async updateStatusChat(req, res, next) {
  //   try {
  //     const { SenderId } = req.params

  //     const dataChat = await GroupMessage.update(
  //       { readMessageStatus: true },
  //       {
  //         where: {
  //           SenderId,
  //           ReceiverId: req.user.id,
  //         },
  //       },
  //     )

  //     await res.status(200).json({
  //       statusCode: 200,
  //       message: "Berhasil Memperbaharui Status Read Chat",
  //     })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // DELETE
  static async deleteChat(req, res, next) {
    try {
      const { id } = req.params

      const dataChat = await GroupMessage.findOne({
        where: {
          id,
        },
      })

      if (!dataChat) {
        throw { name: "Id Chat Tidak Ditemukan" }
      }

      await GroupMessage.destroy({
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
