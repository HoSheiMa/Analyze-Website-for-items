var users = require('../models/users');
var passwordHash = require('password-hash');
const excelToJson = require("convert-excel-to-json");
var items = require('../models/items');
var system_info = require('../models/system_info');
const {Op} = require("sequelize");
const nodemailer = require("nodemailer");

var invoice = require('../models/invoice');
const sequelize = require("../connection");


class UserController {
    isLog = async (req, res) => {
        // console.log("user =============>", req.session.user)
        if (!req.session.user) {
            return res.send(req.session.user ? req.session.user : {})
        }
        //console.log("user =============> ", req.session.user)
        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        let myItems = [];
        if (req.query.filter) {

            if (req.query.filter === "All") {
                myItems = await items.findAll({
                    where: {
                        createdAt: {
                            [Op.gte]: sevenDaysAgo,
                            [Op.lte]: new Date(),
                        },

                    }
                })
            } else {
                myItems = await items.findAll({
                    where: {
                        buyer_name: req.query.filter,
                        createdAt: {
                            [Op.gte]: sevenDaysAgo,
                            [Op.lte]: new Date(),
                        },

                    }
                })
            }
            if (req.session.user) {
                req.session.user.items = myItems;

            }

        } else {
            myItems = req.session.user.role !== "admin" ? await items.findAll({
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
            if (req.session.user) {
                req.session.user.items = myItems;

            }
        }

        res.send(req.session.user ? req.session.user : {})
    }
    update = async (req, res) => {
        if (req.session.user.role === "admin") {

            await items.update((req.body.body), {
                where: {
                    id: req.body.id
                }
            });

            return res.send({
                success: true,
            })
        }
        return res.send({
            success: false,
        })

    }
    LogOut = (req, res) => {
        req.session.user = null;
        res.send({
            success: true
        })
    }
    CheckForgetKey = async (req, res) => {

        var key = req.session.forgetKey,
            email = req.session.forgetEmail,
            sentKey = req.body.key,
            password = req.body.password;
        console.log("==============>", key, password, email, sentKey, sentKey === `${key}`)
        if (key && password && email && sentKey && sentKey === `${key}`) {
            await users.update({
                password: passwordHash.generate(password),
            }, {
                where: {
                    email: email
                }
            });
            return res.send({
                success: true,
            })
        }

        return res.send({
            success: false,
        })

    }
    sendForgetMail = async (req, res) => {
        if (!req.query.to) {
            return res.send({
                success: false,
            })
        }
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        let key = Math.floor(Math.random() * 6000);
        req.session.forgetKey = key;
        req.session.forgetEmail = req.query.to;
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: req.query.to, // list of receivers
            subject: "forget Password", // Subject line
            text: "Your forget Code is " + key, // plain text body
            html: `<b>Your forget Code is <strong>${key}</strong> </b>`, // html body
        });

        return res.send({
            success: true,
            link: nodemailer.getTestMessageUrl(info),
        })

    }
    Log = async (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        //console.log("log ============>", req.session.user !== null)


        var user = await users.findOne({
            where: {
                email: email,
            }
        })
        if (!user) {
            res.send({
                "success": false
            })
        }
        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));


        if (passwordHash.verify(password, user.password)) {
            let myItems = user.role !== "admin" ? await items.findAll({
                where: {
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
            let _users = [];
            if (user.role === "admin") {
                _users = await users.findAll();
            }
            req.session.user = {
                ...user.toJSON(),
                items: myItems,
                users: _users,
            }
            //console.log('user =========>', req.session.user)

            res.send({
                "success": true,
                "user": req.session.user
            })
        } else {
            res.send({
                "success": false
            })
        }

    }
    register = async (req, res) => {

        var user = users.create({
            'f_name': req.body.fname,
            'l_name': req.body.lname,
            'email': req.body.email,
            'password': passwordHash.generate(req.body.password),
            'role': 'user',
        });
        res.send(
            {
                ...user,
                success: true,
            }
        );
    }
    role = async (req, res) => {
        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        let myItems = [];

        // console.log("user =============>", req.session.user)
        if (!req.session.user) {
            return res.send(req.session.user ? req.session.user : {})
        }

        if (req.query.filter) {

            myItems = await items.findAll({
                order: [['expire_date', 'ASC']],
                where: {
                    product_number: {
                        [Op.like]: '%' + req.query.filter + '%'
                    },

                },

                limit: 90,
            })

            req.session.user.items = myItems;
            return res.send({
                ...req.session.user,
                role: req.session.user.role,
                items: myItems,
            });
        } else {
            myItems = await items.findAll({
                order: [['expire_date', 'ASC']],
                limit: 90,
            })
            if (req.session.user) {
                req.session.user.items = myItems;

            }
        }
        let inv = await invoice.findAll();
        return res.send({
            ...req.session.user,
            role: req.session.user.role,
            invoice: req.session.user.role === "admin" ? inv : []
        });
    }
    uploadFile = (file, callback, res) => {
        let sampleFile;
        let uploadPath;
        //console.log('file ==============>', file)

        if (!file || Object.keys(file).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = 'id' + Math.random() * 60000 + file.name;
        uploadPath = __dirname + '/../files/' + sampleFile;

        //console.log('dir ============> ', uploadPath);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
            callback(uploadPath);
        });


    }
    getItems = async (req, res) => {
        let _items;
        _items = await items.findAll({
            order: [['expire_date', 'DESC']]
        });

        return res.send({
            items: _items,
        })

    }
    order = async (req, res) => {

        let order = JSON.parse(req.body.order);
        let htmlMail = (req.body.htmlMail);

        console.log('orderorder,', req.body)

        let error = false;

        for (let i in order) {
            let item = await items.findOne({
                where: {
                    // product_number: order[i].product_number,
                    // expire_date:  order[i].expire_date,
                    id: order[i].id

                }
            });

            if (!(+item.quantity >= order[i].need)) {
                error = true;
                break;
            }
            if (item.quantity == order[i].need) {

                await items.destroy({
                    where: {
                        // product_number: order[i].product_number,
                        // expire_date:  order[i].expire_date,
                        id: order[i].id
                    }
                });
            } else {
                await items.update({
                    quantity: +item.quantity - order[i].need

                }, {
                    where: {
                        // product_number: order[i].product_number,
                        // expire_date:  order[i].expire_date,
                        id: order[i].id
                    }
                });

            }


        }

        let info;

        if (error) {
            return res.send({done: 0});
        } else {

            await invoice.create({
                html: htmlMail,
                json: JSON.stringify(order),
                user_id: req.session.user.id
            })

            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: '', // generated ethereal user
                    pass: '', // generated ethereal password
                },
            });
            info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: 'qandilafa@gmail.com', // list of receivers
                subject: "new invoice from user id: " + req.session.user.id, // plain text body, // Subject line
                html: htmlMail, // html body
            });


        }

        return res.send({done: 1});

    }
    saveAsExcel = async (req, res) => {
        if (req.session.user && (req.session.user.role === "superuser" || req.session.user.role === "admin")) {
            this.uploadFile(req.files.myFile, async (file_path) => {
                    const result = excelToJson({
                        sourceFile: file_path,
                        // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
                        sheets: [{
                            name: 'MainPage',
                            columnToKey: {
                                "D": 'product_number',
                                "O": "quantity",
                                "P": "expire_date",
                                "X": "price",
                                "F": "desc"
                            }
                        }],

                    });

                    if (result.MainPage) {
                        for (var i in result.MainPage) {
                            if (i != 0) {

                                for (var ii in result.MainPage[i]) {
                                    if (typeof result.MainPage[i][ii] !== "string") {
                                        result.MainPage[i][ii] = `${result.MainPage[i][ii]}`;
                                    }
                                }
                                var today = new Date(result.MainPage[i]['expire_date']);
                                var dd = String(today.getDate()).padStart(2, '0');
                                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                var yyyy = today.getFullYear();

                                today = yyyy + "-" + mm + "-" + dd + " 00:00:00";

                                result.MainPage[i]['expire_date'] = today;
                                items.create(result.MainPage[i])
                            }

                        }

                    }
                    // console.log( result.MainPage );
                    res.send(JSON.stringify(result.MainPage));


                }
                ,
                res
            );


        }

    }

    updateImg = async (req, res) => {
        if (req.session.user && req.session.user.role === "admin") {
            this.uploadFile(req.files.myFile, async (file_path) => {


                    await items.update({
                        img: "http://localhost:3000/" + file_path.split('/../files/')[1]
                    }, {
                        where: {
                            id: req.body.id
                        }
                    })

                res.send(
                    {
                        success: true
                    }
                )

                }
                ,
                res
            );


        } else {
            res.send({
                success: false,
            })
        }

    }

    welcomeItems = async (req, res) => {

         let _items;
        _items = await items.findAll({
          order: sequelize.random(), limit: 5
        });

        return res.send({
            items: _items,
        })

    }
}

var
    User = new UserController


module
    .exports = User;
