import express from 'express';
import UsersModel from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            message: 'Invalid password',
            statusCode: 400
        })
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET_JWT_KEY, {
        expiresIn: '24'
    })

    res.header('auth', token).status(200).send({
        message: "login effettuato con successo",
        statusCode: 200,
        token
    })
})

export default router;