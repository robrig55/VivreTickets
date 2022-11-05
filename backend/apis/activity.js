const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')

const Activity = require('../models/Activity')

router.post('/add', authMiddleware, (req, res) => {
  const action = new Activity(req.body)
  action.save()
    .then((data) => {
        res.json({
            id: data._id,
            result: 'success'
        })
    })
    .catch((err) => {
        res.status(404).json(err)
    })
})

router.post('/update', authMiddleware, (req, res) => {
    const { before_mail, after_mail } = req.body;
    Activity.update({ to: before_mail }, {
        $set: {
            to: after_mail
        }
    })
    .then((data) => {
        res.status(200).json('Success')
    })
    .catch(err => res.status(500).json('Internal server error'))
})

router.get('/:_id', (req, res) => {
    const id = req.params._id
    Activity.findById(id)
        .then((data) => {
            res.json({data})
        })
        .catch((err) => {
            res.status(404).json(err)
        })
})

router.get('/act_per_event/:_id', (req, res) => {
    const id = req.params._id
    Activity.find({eventId: id})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
})

router.get('/act_per_user/:_id', (req, res) => {
    const id = req.params._id
    Activity.find({to: id})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
})

router.get('/:_id', (req, res) => {
    const id = req.params._id
    Activity.findById(id)
        .then((data) => {
            res.json(data)
        })
        .catch(err => res.status(404).json(err))
})

module.exports = router;