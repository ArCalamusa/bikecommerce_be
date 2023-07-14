import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/users.js';
import loginRoute from './routes/login.js';
import productsRoute from './routes/products.js'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

/*  PORTA LOCALE */
const PORT = process.env.PORT;

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

/* middleware per poter leggere il body in formato json */
app.use(cors());
app.use(express.json())

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