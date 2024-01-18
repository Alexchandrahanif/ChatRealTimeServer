const { User, Contact } = require("../models")
class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const data = await Contact.findAll()

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Contact",
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
      const data = await Contact.findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id Contact Tidak Ditemukan" }
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Contact",
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

      const data = await Contact.create(body)
      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Contact",
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

      const data = await Contact.findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id Contact Tidak Ditemukan" }
      }

      await Contact.update(body, { where: { id } })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mengubah Data Contact",
      })
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  static async getAll(req, res, next) {
    try {
      const { id } = req.params
      const data = await Contact.findOne({
        where: {
          id,
        },
      })

      if (!data) {
        throw { name: "Id Contact Tidak Ditemukan" }
      }

      await Contact.destroy({
        where: {
          id,
        },
      })

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Contact",
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
