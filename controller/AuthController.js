const User = require("../models/User")
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, securedPass) {
       if(err) {
           res.json({
               error: err
           })
       }
        let user = new User ({
            user_name: req.body.user_name,
            email: req.body.email,
            password: securedPass
        })
        user.save()
            .then(user => {
                res.status(201).json({
                    message: 'User Added Successfully',
                    username: req.body.user_name,
                    password: req.body.password
                })
            })
            .catch(error => {
                res.json({
                    message: 'Invalid Username and password'
                })
            })
    })


}

const login = (req, res, next) => {
    var user_name = req.body.user_name
    var password = req.body.password

    User.findOne({$or: [{user_name: user_name}, {email: user_name}]})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err){
                        res.json(err)
                    }
                    if(result){
                        let token = jwt.sign({name: user.name}, 'SecretValue', {expiresIn: '2h'})
                        res.status(200).json({
                            message: 'Login Successfully',
                            username: user_name,
                            password: password,
                            token
                        })
                    }else{
                        res.json({
                            message: 'Invalid Username and password'
                        })
                    }
                })
            }else {
                res.json({
                    message: 'Invalid Username and password'
            })
            }
        })
}

module.exports = {
    register, login
}