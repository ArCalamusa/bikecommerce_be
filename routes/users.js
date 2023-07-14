import express from 'express';
import UsersModel from '../models/users.js';
import bcrypt from 'bcrypt';
import cacheMiddleware from '../middleware/cacheMiddleware.js';
import validateUser from '../middleware/validateUser.js';
import logger from '../middleware/logger.js';

const router = express.Router()

/* GET */
router.get('/users', [cacheMiddleware, logger], async (req, res) => {
    try {
        const users = await UsersModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

/* POST */
router.post('/users/new', validateUser, async (req, res) => {

    const genSalt = await bcrypt.genSalt(10)
    const hashPW = await bcrypt.hash(req.body.password, genSalt)

    const user = new UsersModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashPW,
    })
    try {
        const userExist = await UsersModel.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(409).send({
                message: "Email già esistente",
                stausCode: 409
            })
        }

        const newUser = await user.save()
        res.status(201).send({
            message: "Registered user"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

/* PATCH */
router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const userExist = await UsersModel.findById(id)
    if (!userExist) {
        return res.status(404).send({
            message: "User does not exist"
        })
    }
    try {
        const userID = id;
        const dataUpdated = req.body;
        const options = { new: true } //mostra utente con i dati aggiornati
        const result = await UsersModel.findByIdAndUpdate(userID, dataUpdated, options)
        res.status(200).sendStatus({
            message: "User modified"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

/* DELETE */
router.delete('/users/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UsersModel.findById(id).deleteOne();
        if (!user) {
            return res.status(484).send({
                message: 'There is no User with this Id'
            })
        }
        res.status(208).send({
            message: "User deleted from the db"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

export default router;