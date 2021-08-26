var sequelize = require('../connection');
const {DataTypes} = require("sequelize");

var invoice = sequelize.define('invoice', {
    'html': {
        type: DataTypes.TEXT('long'),
        // defaultValue: '',
    },
    'json': {
        type: DataTypes.TEXT('long'),
        // defaultValue: '',
    },
    'user_id': {
        type: DataTypes.STRING,
        defaultValue: '',
    },
});

module.exports = invoice;
