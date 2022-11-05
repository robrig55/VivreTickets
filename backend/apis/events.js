const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const randomSymbol = require('../utils/symbols')

const Events = require("../models/Events")

router.post('/add', authMiddleware, (req, res) => {
    const event = new Events(req.body);
    event.save()
        .then((data) => {
            res.json({
                id: data._id,
                result: 'success'
            })
        })
        .catch(err => res.status(404).json(err))
})

router.post('/update_count/:_id', authMiddleware, (req, res) => {
    const id = req.params._id;
    const { sale_seat } = req.body;
    Events.update(
        {_id: id},
        {
            $set: { 
                seat_ticket_sale_count: sale_seat
            }
        }
    )
    .then(() => {
        res.json({
            result: 'success'
        })
    })
    .catch(err => res.status(404).json(err))
})

router.post('/update/:_id', authMiddleware, (req, res) => {
    console.log(req.body)
    const id = req.params._id;
    Events.updateOne(
        {_id: id},
        {
            $set: req.body
        }
    )
    .then((data) => {
        console.log(data)
        if(!data) {
            res.status(404).json('Internal Server Error')
        } else {
            res.json({ 
                id: id,
                result: 'success' 
            })
        }
    })
})

router.post('/publish', authMiddleware, (req, res) => {
    const { id, status } = req.body
    Events.update(
        {_id: id},
        {
            $set: {
                published: status
            }
        }
    )
    .then(() => {
        res.json({
            result: 'Success'
        })
    })
    .catch(err => res.status(404).json('Internal Server Error'))
})

router.post('/upload-img', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            })
        } else {
            let avatar = req.files.logo;
            let ext = avatar.mimetype.split('/')[1]
            let name = avatar.name.split(`.${ext}`)[0]
            let randsb = randomSymbol.generateSymbol(10)
            let rename = name.replace(' ', '-')
            rename = rename + '-' + randsb + `.${ext}`

            avatar.mv('./uploads/' + rename);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: rename,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/', (req, res) => {
    Events.find()
        .then((data) => {
            res.json(data)
        })
        .catch(err => res.status(404).json(err))
})

router.get('/:_id', (req, res) => {
    const id = req.params._id
    Events.findById(id)
        .then((data) => {
            if(!data) {
                res.status(400).json('Not found')
            } else {
                res.json(data)
            }
        })
        .catch(err => res.status(404).json(err))
})

router.get('/email/:_mail', (req, res) => {
    const mail = req.params._mail
    Events.find({ creator: mail })
        .then((data) => {
            res.json(data)
        })
        .catch(err => res.status(404).json(err))
})

router.get('/remove/:_id', authMiddleware, (req, res) => {
    const id = req.params._id
    Events.deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
})

module.exports = router;