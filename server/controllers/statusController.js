const {Status} = require('../models/models')

class StatusController {
    async getAll(req, res) {
        const statuses = await Status.findAll()
        return res.json(statuses)
    }
}

module.exports = new StatusController()
