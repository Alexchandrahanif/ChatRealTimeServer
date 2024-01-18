const { User, Group, GroupMessage } = require("../models")
class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const data = await Group.findAll()

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Group",
        data: data,
      })
    } catch (error) {
      next(error)
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params
      const data = await Group.findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id Group Tidak Ditemukan" }
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Group",
        data: data,
      })
    } catch (error) {
      next(error)
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const {} = req.body
      let body = {
        //
      }

      const data = await Group.create(body)
      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Group",
        data: data,
      })
    } catch (error) {
      next(error)
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params
      const {} = req.body

      let body = {}

      const data = await Group.findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id Group Tidak Ditemukan" }
      }

      await Group.update(body, { where: { id } })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mengubah Data Group",
      })
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  static async getAll(req, res, next) {
    try {
      const { id } = req.params
      const data = await Group.findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id Group Tidak Ditemukan" }
      }

      await Group.destroy({
        where: {
          id,
        },
      })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Group",
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
