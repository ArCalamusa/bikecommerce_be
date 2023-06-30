import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/users.js';
import loginRoute from './routes/login.js';
import productsRoute from './routes/products.js'
import cors from 'cors';
import dotenv from 'dotenv';
//import Stripe from 'stripe';
import bodyParser from "body-parser";

dotenv.config()

/*  PORTA LOCALE */
const PORT = process.env.PORT;

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

/* middleware per poter leggere il body in formato json */
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* STRIPE */
app.post("/pay", async (req, res) => {
    console.log(req.body.token);
    await Stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd",
    });
});

app.use(cors());

app.use('/', usersRoute)
app.use('/', loginRoute)
app.use('/', productsRoute)

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'))
db.once('open', () => { console.log('db connected') })

app.listen(PORT, () => console.log(`server started on the port ${PORT}`))