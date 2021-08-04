const sequelize = require('../db')
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    patron: {type: DataTypes.STRING},
}, {timestamps: false})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    head: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING},
    startDate: {type: DataTypes.STRING, allowNull:false},
    endDate: {type: DataTypes.STRING, allowNull:false},
    updateDate: {type: DataTypes.STRING},
}, {timestamps: false})

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    statusName: {type: DataTypes.STRING, allowNull:false},
}, {timestamps: false})

const Priority = sequelize.define('priority', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    priorityName: {type: DataTypes.STRING, allowNull:false},
}, {timestamps: false})

User.hasMany(Task, {as: 'creator'})
Task.belongsTo(User, {as: 'creator'})

Status.hasMany(Task)
Task.belongsTo(Status)

Priority.hasMany(Task)
Task.belongsTo(Priority)

User.hasMany(User, {as: 'leader'})

module.exports = {
    User, Task, Status, Priority
}
