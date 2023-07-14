import express from 'express';
import UsersModel from '../models/users.js';
import bcrypt from 'bcrypt';

const router = express.Router()

/* POST */
router.post('/login', async (req, res) => {
    const user = await UsersModel.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(404).send({
            message: "User not found",
            stausCode: 404
        })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).send({
            message: 'Password non valida',
            statusCode: 400
        })
    }
})

export default router