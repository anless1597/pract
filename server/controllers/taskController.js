const {Task} = require('../models/models')
const apiError = require('../errors/APIError')
const {Op} = require('sequelize')

class TaskController {
    async create(req, res, next){
        try{
            const {head, description, endDate, statusId, priorityId, userId, creatorId} = req.body
            let startDate = new Date()
            startDate = `${startDate.getFullYear()}-${startDate.getMonth()+1<10?'0'+(startDate.getMonth()+1):startDate.getMonth()+1}-${startDate.getDate()<10?'0'+startDate.getDate():startDate.getDate()}`
            const task = await Task.create({head:head, description:description,startDate:startDate, endDate:endDate,
                userId:userId, creatorId:creatorId, statusId:statusId, priorityId:priorityId, updateDate:startDate})

            return res.json(task)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async update(req, res, next){
        try{
            const {id, head, description, endDate, statusId, priorityId, userId, creatorId} = req.body
            let updateDate = new Date()
            updateDate = `${updateDate.getFullYear()}-${updateDate.getMonth()+1<10?'0'+(updateDate.getMonth()+1):updateDate.getMonth()+1}-${updateDate.getDate()<10?'0'+updateDate.getDate():updateDate.getDate()}`
            const task = await Task.update(
            {head:head, description:description, endDate:endDate,
                userId:userId, creatorId:creatorId, statusId:statusId, priorityId:priorityId, updateDate:updateDate},
                {where: {id:id}})
            return res.json(task)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try {
            const {id, groupType} = req.query
            let tasks
            let currentDate
            switch (groupType) {
                case "Без группировки":
                    tasks = await Task.findAll({where:{[Op.or]: [{userId: id },{creatorId: id}]}})
                    tasks.reverse()
                    break;
                case 'На сегодня':
                    currentDate = new Date()
                    currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1<10?'0'+(currentDate.getMonth()+1):currentDate.getMonth()+1}-${currentDate.getDate()<10?'0'+currentDate.getDate():currentDate.getDate()}`
                    tasks = await Task.findAll({where:{
                        [Op.or]: [{userId: id },{creatorId: id}],
                        [Op.and]: {endDate: {[Op.lte]: currentDate} }}})
                    break;
                case 'На неделю':
                    currentDate = new Date()
                    currentDate.setDate(currentDate.getDate()+7)
                    currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1<10?'0'+(currentDate.getMonth()+1):currentDate.getMonth()+1}-${currentDate.getDate()<10?'0'+currentDate.getDate():currentDate.getDate()}`
                    tasks = await Task.findAll({where:{
                            [Op.or]: [{userId: id },{creatorId: id}],
                            [Op.and]: {endDate: {[Op.lte]: currentDate} }}})
                    break;
                case 'На будущее':
                    currentDate = new Date()
                    currentDate.setDate(currentDate.getDate()+7)
                    currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1<10?'0'+(currentDate.getMonth()+1):currentDate.getMonth()+1}-${currentDate.getDate()<10?'0'+currentDate.getDate():currentDate.getDate()}`
                    tasks = await Task.findAll({where:{
                            [Op.or]: [{userId: id },{creatorId: id}],
                            [Op.and]: {endDate: {[Op.gt]: currentDate} }}})
                    break;
                default:
                    tasks = await Task.findAll({where:{userId: groupType, creatorId: id}})
                    break;

            }
            return res.json(tasks)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

}

module.exports = new TaskController()