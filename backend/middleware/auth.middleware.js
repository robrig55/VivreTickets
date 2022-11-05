const Users = require('../models/Users')
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config')

module.exports = (req, res, next) => {
    const token = req.header('X-Auth-Token');

    if (!token || token === '') {
        return res.status(400).json("No token.");
    }

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error || !decoded) {
            console.log('jwt error: ', error);
            return res.status(401).json("Unauthorized.");
        } else {
            const { account } = decoded;
            Users.findOne({ confirmationCode: token, account: account }).then(async findRes => {
                if (findRes) {
                    next();
                } else {
                    return res.status(401).json("Unauthorized");
                }
            }).catch (err => {
                return res.status(500).json("Internal server error");
            })
        }
    });
}