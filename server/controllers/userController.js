const apiError = require('../errors/APIError')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, login) => {
    return jsonwebtoken.sign({id, login}, process.env.SECRET_KEY, {expiresIn: '2h'})

}

class UserController {
    async registration(req, res, next) {
        try {
            const {login, password, name, surname, patronimic, leader} = req.body
            if (!login || !password || !name || !surname || !patronimic) {
                return next(apiError.badRequest('Введены не все данные'))
            }
            const candidate = await User.findOne({where: {login: login}})
            if (candidate) {
                return next(apiError.badRequest("Пользователь с таким логин уже существует"))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            let user
            if (leader) {
                const lead = await User.findOne({where: {login: leader}})
                if (!lead)
                    return next(apiError.badRequest('Пользователя с логином лидера не существует'))

                user = await User.create({
                    login: login,
                    password: hashPassword,
                    name: name,
                    surname: surname,
                    patron: patronimic,
                    userId: lead.id
                })
            } else {
                user = await User.create({
                    login: login, password: hashPassword, name: name, surname: surname, patron: patronimic
                })
            }
            const jwt = generateJwt(user.id, user.login)
            return res.json({jwt})
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async login(req, res, next){
        try {
            const {login, password} = req.body
            let user = await User.findOne({where: {login:login}})
            if (!user) {
                return next(apiError.badRequest('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(apiError.badRequest('Указан неверный пароль'))
            }
            const executors = await User.findAll({where: {userId: user.id}})
            const jwt = generateJwt(user.id, user.login)
            return res.json({jwt, user, executors})
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async check(req, res, next){
        const jwt = generateJwt(req.user.id, req.user.login)
        return res.json({jwt})
    }
}

module.exports = new UserController()