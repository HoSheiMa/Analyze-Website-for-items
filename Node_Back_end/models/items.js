var sequelize = require('../connection');
const {DataTypes} = require("sequelize");

var users = sequelize.define('items', {
    'img': {
        type: DataTypes.STRING,
        defaultValue: 'http://localhost:3000/box.png', // default image
    },
    'product_number': {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    'desc':{
        type: DataTypes.STRING,
        defaultValue: '',
    },
     'quantity': {
        type: DataTypes.STRING,
        defaultValue: '',
    },
     'expire_date': {
        type: DataTypes.DATE,
    },
     'price': {
        type: DataTypes.STRING,
        defaultValue: '',
    },
     'discount': {
        type: DataTypes.STRING,
        defaultValue: '0',
    },

});

module.exports = users;
