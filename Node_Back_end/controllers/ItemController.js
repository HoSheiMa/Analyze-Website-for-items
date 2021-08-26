var users = require('../models/users');
var passwordHash = require('password-hash');
const excelToJson = require("convert-excel-to-json");
var items = require('../models/items');
const {Op} = require("sequelize");

class ItemController {

    update = async (req, res) => {

        var item_number = req.body.item_number
        var item_description = req.body.item_description
        var comment = req.body.comment
        var last_sale_date = req.body.last_sale_date
        console.log("info =====>", {
            item_number: item_number,
            item_description: item_description,
            comment: comment,
            last_sale_date: last_sale_date,
        })

        await items.update({
            item_number: item_number,
            item_description: item_description,
            comment: comment,
            last_sale_date: last_sale_date,
        }, {
            where: {item_number: item_number},
            logging: (sql) => {
                console.log("sql =========> ", sql)
            }
        });

        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

        let myItems = req.session.user.role !== "admin" ? await items.findAll({
            where: {
                buyer_name: req.session.user.f_name + " " + req.session.user.l_name,
                createdAt: {
                    [Op.gte]: sevenDaysAgo,
                    [Op.lte]: new Date(),
                }
            }
        }) : await items.findAll({
            where: {
                createdAt: {
                    [Op.gte]: sevenDaysAgo,
                    [Op.lte]: new Date(),
                }
            }
        });
        req.session.user = {
            ...req.session.user,
            items: myItems,
        }

        res.send({
            "success": true,
            "user": req.session.user
        })
    }
}

var User = new ItemController


module.exports = User;