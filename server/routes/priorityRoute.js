const Router = require('express')
const router = new Router()
const priorityController = require('../controllers/priorityController')

router.get('/', priorityController.getAll)

module.exports = router
