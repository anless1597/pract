const jsonwebtoken = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const jwt = req.headers.authorization.split(' ')[1]
        if (!jwt) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jsonwebtoken.verify(jwt, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};
