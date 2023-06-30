import express from 'express';
import UsersModel from '../models/users.js';

const router = express.Router()

/* POST */
router.post('/login', async (req, res) => {
    const user = await UsersModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (!user) {
        return res.status(404).send({
            message: "User not found"
        })
    }
    res.status(200).send(user)
})

export default router