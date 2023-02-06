const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./user')

// User 

const Tought = db.sequelize.define('Tought' , {
    title: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought