// Call Model from Sequelize to Controller
const { Todo } = require('../models')

class mainController {
  static healthCheck (req, res, next) {
    res.status(200).json({ message: 'Suksess' })
  }

  static index (req, res, next) {
    // SELECT * FROM Todos;
    Todo.findAll()
      .then(data => {
        res.status(200).json({ data, message: 'Suksess' })
      })
      .catch(err => {
        res.status(500).json({ message: 'terjadi kesalahan', error: err })
      })
  }

  static todoById (req, res, next) {
    // SELECT * FROM Todos WHERE id = :id
    Todo.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Data Todo tidak tersedia!' })
        } else {
          res.status(200).json({ data, message: 'Suksess' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'terjadi kesalahan', error: err })
      })
  }

  static createTodo (req, res, next) {
    Todo.create({
      title: req.body.title,
      description: req.body.description
    })
      .then(data => {
        res.status(201).json({ data, message: 'Todo terupdate!' })
      })
      .catch(err => {
        res.status(500).json({ message: 'terjadi kesalahan', error: err })
      })
  }

  static updateTodo (req, res, next) {
    const updatedTodo = {
      title: req.body.title,
      description: req.body.description
    }

    Todo.findByPk(req.params.id)
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Data Todo tidak tersedia!' })
        } else {
          return data.update(updatedTodo)
        }
      })
      .then(data => {
        res.status(200).json({ data: updatedTodo, message: 'Todo terupdate!' })
      })
      .catch(err => {
        res.status(500).json({ message: 'terjadi kesalahan', error: err })
      })
  }

  static restoreTodo (req, res, next) {
    const restoreTodo = {
      deletedAt: null
    }
    Todo.findByPk(req.params.id, { paranoid: false }) // Include soft-deleted records
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Data Todo tidak tersedia!' })
        } else {
          return Todo.update(restoreTodo, { where: { id: req.params.id } })
        }
      })
      .then(() => {
        res.status(200).json({ message: 'Todo Restore!', data })
      })
      .catch(err => {
        res.status(500).json({ message: 'terjadi kesalahan', error: err })
      })
  }
}

  // softdelete
  static deleteTodo (req, res, next) {
    const deleteTodo = {
      deletedAt: new Date()
    }
    Todo.findByPk(req.params.id)
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Data Todo tidak tersedia!' })
        } else {
          return Todo.update(deleteTodo, { where: { id: req.params.id } })
        }
      })
      .then(() => {
        res.status(200).json({ message: 'Todo terdelete!' })
      })
      .catch(err => {
        res.status(500).json({ message: 'terjadi kesalahan', error: err })
      })
  }

  

module.exports = mainController
