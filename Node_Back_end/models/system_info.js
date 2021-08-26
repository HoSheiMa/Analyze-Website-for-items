var sequelize = require('../connection');
const {DataTypes} = require("sequelize");

var system_info = sequelize.define('system_info', {
    'name': {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    'value': {
        type: DataTypes.STRING,
        defaultValue: '',
    }
});

module.exports = system_info;
