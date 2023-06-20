import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './routes/users.js';

/*  PORTA LOCALE */
const PORT = 5050;

const app = express();

/* middleware per poter leggere il body in formato json */
app.use(express.json());

app.use('/', usersRoute)

mongoose.connect("mongodb+srv://manciko08:jozDdjLwoD1s3L8J@m6backend.qxvmfkg.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'))
db.once('open', () => { console.log('db connected') })

app.listen(PORT, () => console.log(`server started on the port ${PORT}`))