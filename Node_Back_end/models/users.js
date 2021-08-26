var sequelize = require('../connection');
const {DataTypes} = require("sequelize");

var users = sequelize.define('users', {
    f_name: {
        type: DataTypes.STRING
    },
    l_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        default: "user"
    },
    password: {
        type: DataTypes.STRING
    },

});

module.exports = users;