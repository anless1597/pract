const Router = require('express')
const router = new Router()
const userRouter = require('./userRoute')
const taskRouter = require('./taskRoute')
const statusRouter = require('./statusRoute')
const priorityRouter = require('./priorityRoute')

router.use("/user", userRouter)
router.use('/task', taskRouter)
router.use('/status', statusRouter)
router.use('/priority', priorityRouter)

module.exports = router