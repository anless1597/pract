const {Priority} = require('../models/models')

class PriorityController {
    async getAll(req, res) {
        const priorities = await Priority.findAll()
        return res.json(priorities)
    }
}

module.exports = new PriorityController()
