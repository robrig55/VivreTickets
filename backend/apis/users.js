const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwt = require("jsonwebtoken")
const config = require('../config/auth.config')
const nodemailer = require('../config/nodemailer.config')
const authMiddleware = require('../middleware/auth.middleware')

const Users = require('../models/Users')

router.post('/login', (req, res) => {
    const { email, password } = req.body
    Users.findOne({
        email: email
    })
    .then(user => {
        if(!user) {
            res.status(404).json('User does not exist')
        }
        else if(user.status != 'Active') {
            res.status(401).json('Pending Account. Please Verify Your Email')
        }
        else {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) {
                    res.status(404).json(err)
                }
                if(result) {
                    res.json({
                        result: 'Login Success',
                        id: user._id,
                        user: user.email,
                        role: user.role,
                        token: user.confirmationCode
                    })
                } else {
                    res.status(200).json('Invalid password')
                }
            })
        }
    })
    .catch(err => res.status(404).json(err))
})

router.post('/register', (req, res) => {
    const { 
        email,
        f_name,
        l_name,
        country,
        phone,
        register_date,
        role 
    } = req.body
    

    const token = jwt.sign({email: email}, config.secret)

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const user = new Users({
            f_name: f_name,
            l_name: l_name,
            country: country,
            phone: phone,
            register_date: register_date,
            role: role,
            email: email,
            password: hash,
            confirmationCode: token
        })
        user.save((err) => {
            if(err) {
                res.status(500).json({ message: err })
                return 
            }
            res.json({
                result: 'Success',
                message: 'User was registered successfully! Please check your email'
            })
            nodemailer.sendConfirmationEmail(
                `${user.f_name} ${user.l_name}`,
                user.email,
                user.confirmationCode
            )
        })
    })
})

router.post('/change_email', authMiddleware, (req, res) => {
    const { before_mail, after_mail } = req.body
    Users.find({ email: after_mail })
        .then((data) =>{
            if(data.length > 0) {
                res.status(400).json('User already exists')
            }
        })
        .catch(err => res.status(404).json(err))
    Users.update({ email: before_mail }, {
        $set: {
            email: after_mail
        }
    }).then(() => { res.status(200).json('Success') })
    .catch(err => res.status(404).json(err))
})

router.post('/change_password', authMiddleware, (req, res) => {
    const { email, password } = req.body
    bcrypt.hash(password, saltRounds, (err, hash) => {
        Users.update({ email: email }, {
            $set: {
                password: hash
            }
        }).then((data) => { res.status(200).json('Success') })
        .catch(err => res.status(404).json(err))
    })
})

router.get('/', (req, res) => {
    Users.find({role: 'user'})
        .then((data) => {
            res.json(data)
        })
        .catch(err => res.status(404).json(err))
})

router.get('/:_email', (req, res) => {
    const mail = req.params._email
    Users.find({ email: mail })
        .then((data) => {
            res.json(data)
        })
        .catch(err => res.status(404).json(err))
})

router.get('/id/:_id', (req, res) => {
    const id = req.params._id
    Users.findById(id)
        .then((data) => {
            if(!data) {
                res.status(400).json("Not found")
            } else {
                res.json(data)
            }
        })
        .catch(err => res.status(404).json(err))
})

router.get('/confirm/:confirmationCode', (req, res) => {
    Users.findOne({
        confirmationCode: req.params.confirmationCode,
    })
        .then((user) => {
            if(!user) {
                res.status(404).json({ message: 'User not found' })
                return
            }

            user.status = "Active"

            user.save((err) => {
                if(err) {
                    res.status(500).json({ message: err })
                    return;
                }
            })
            res.status(200).json({ message: 'Success' })
        })
        .catch((e) => console.log("Error:", e))
})

module.exports = router;