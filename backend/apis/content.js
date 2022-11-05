const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')

const Content = require('../models/Contents')

router.get('/', (req, res) => {
    Content.find()
        .then((data) =>{
            res.json(data)
        })
        .catch(err => res.status(404).json(err) )
})

router.get('/remove/:_id', authMiddleware, (req, res) => {
    const id = req.params._id
    Content.deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch(err => res.status(404).json(err))
})

router.post('/update/:_id', authMiddleware, (req, res) => {
    const id = req.params._id
    Content.updateOne({ _id: id }, {
        $set: req.body
    })
    .then((data) => {
        res.json({
            result: 'success'
        })
    })
    .catch(err => res.status(404).json(err))
})

router.post('/add', authMiddleware, (req, res) => {
    console.log(req.body)
    const newEle = new Content(req.body)
    newEle.save()
        .then((data) => {
            res.json({
                result: 'success'
            })
        })
        .catch(err => res.status(404).json(err))
})

router.get('/terms', (req, res) => {
    Content.findOne({ area: { $regex: 'terms'} })
        .then((data) => {
            if(!data) {
                res.status(404).json('Not found')
            } else {
                res.json(data)
            }
        })
        .catch(err => res.status(404).json(err))
})

module.exports = router;